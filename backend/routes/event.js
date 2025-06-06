const express = require("express");
const router = express.Router();

const multer = require("multer");
const verifyToken = require("../middlewares/verifyToken");
const Event = require("../models/event");
const cloudinary = require("../lib/cloudinary");
const { getKitToken } = require("../zegocloud/kitToken");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(verifyToken);

router.post("/create", upload.single("file"), async (req, res) => {
  try {
    // const { title, description, thumbnail, startDateTime, endDateTime, type } = req.body;
    // req.user = {
    //     sub: '101076041466164809210',
    //     name: 'Yash Garg',
    //     given_name: 'Yash',
    //     family_name: 'Garg',
    //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocImy4jM3zNTztKxHGvRcEFfRwkkOcxC3lJjjtQ0Y9NeS2oiW7QN=s96-c',
    //     email: 'yg292001@gmail.com',
    //     email_verified: true,
    //     id: '67e588cabf5d3c204c7f9c5b'
    //   }
    const createdBy = req.user.id;
    // const eventSchema = new mongoose.Schema({
    //   title: { type: String, required: true, trim: true },
    //   description: { type: String, required: true },
    //   thumbnail: { type: String },

    //   startDateTime: { type: Date, required: true }, // Start time
    //   endDateTime: { type: Date, required: true },   // End time

    //   type: { type: String, enum: ["Webinar", "Seminar", "Workshop"], required: true },
    //   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    //   meetingDetails: {
    //     meetingID: { type: String, unique: true, required: true },
    //     attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of attendees
    //   },
    // }, { timestamps: true });

    // LOGGING
    console.log(req.user.id);
    // console.log(req.body);
    // console.log(req.file);
    const eventThumbnailBuffer = req.file.buffer;
    const uploadResult = await new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, uploadResult) => {
        if (error) return reject(error);
        return resolve(uploadResult);
      })
      uploadStream.end(eventThumbnailBuffer);
    });

    const thumbnailUrl = uploadResult.secure_url;

    const event = new Event({
      title: req.body.eventTitle,
      description: req.body.eventDescription,
      thumbnail: thumbnailUrl,
      startDateTime: req.body.startDateTime,
      endDateTime: req.body.endDateTime,
      type: req.body.eventType,
      createdBy: req.user.id,
      meetingDetails: {
        meetingID: Math.random().toString(36).substring(2, 15), // Generate a random meeting ID
        attendees: [req.user.id], // Add the creator as the first attendee
      },
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/eventInfo", async (req, res) => {
  try {
    let eventId = req.body.eventId;
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }
    const event = await Event.findOne({ _id: eventId }).populate("meetingDetails.attendees", "name email");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });

  }
})

router.get("/getAll", async (req, res) => {
  try {
    // escape regex
    let filter = req.query.filter || "";
    let type = req.query.type || null;
    filter = filter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    let events;

    if (type) {
      type = type.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      events = await Event.find({ title: { $regex: filter, $options: "i" }, type: type });
    }
    else {
      events = await Event.find({ title: { $regex: filter, $options: "i" } });
    }

    events = events.filter((event) => {
      const end = new Date(event.endDateTime);
      const currTime = new Date();
      if (currTime > end) {
        return false;
      }
      return true;
    })
    // console.log(events);
    if (!events) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json(events);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.get("/getMyEvents", async (req, res) => {
  try {
    // escape regex
    const showPastEvents = req.query.showPastEvents || false; // default hide past events
    let events = await Event.find({ createdBy: req.user.id });
    if (showPastEvents != "true") {
      events = events.filter((event) => {
        const end = new Date(event.endDateTime);
        const currTime = new Date();
        if (currTime > end) {
          return false;
        }
        return true;
      })
    }
    if (!events) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json(events);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post("/register", async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;
    const event = await Event.findById(eventId);
    if (!event) {
      console.log("Event not found");
      return res.status(404).json({ message: "Event not found" });
    }
    event.meetingDetails.attendees.push(userId);
    await event.save();
    res.status(200).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post("/token", async (req, res) => {
  try {
    const { meetingID } = req.body;
    const appID = Number(process.env.ZEGOCLOUD_APP_ID);
    const userId = req.user.id;
    const event = await Event.findOne({ "meetingDetails.meetingID": meetingID });

    if (!event.meetingDetails.attendees.includes(userId)) {
      return res.status(403).json({ message: "User is not registered for the event" });
    }

    if (!event) {
      console.log("Meeting not found");
      return res.status(404).json({ message: "Meeting not found" });
    }
    // console.log(event);
    // console.log(event.createdBy);
    let publishStream = 0;
    if (event.createdBy.toString() === userId) {
      publishStream = 1;
    }
    const token = getKitToken(userId, meetingID, 1, publishStream);
    res.status(200).json({ appID, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.put("/update", upload.single("file"), async (req, res) => {
  try {
    const { eventId, eventTitle, eventDescription, startDateTime, endDateTime, eventType } = req.body;
    const updatedData = {};
    if (!eventId) {
      res.status(400).json({ message: "Event ID is required" });
      return;
    }
    if (eventTitle) updatedData.title = eventTitle;
    if (eventDescription) updatedData.description = eventDescription;
    if (startDateTime) updatedData.startDateTime = startDateTime;
    if (endDateTime) updatedData.endDateTime = endDateTime;
    if (eventType) updatedData.type = eventType;

    if (req.file) {
      const eventThumbnailBuffer = req.file.buffer;
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, uploadResult) => {
          if (error) return reject(error);
          return resolve(uploadResult);
        });
        uploadStream.end(eventThumbnailBuffer);
      });
      updatedData.thumbnail = uploadResult.secure_url;
    }

    const event = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete", async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) {
    res.status(400).json({ message: "Event ID is required" });
    return;
  }
  try {
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})
module.exports = router;