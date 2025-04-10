const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String},
  thumbnail: { type: String },

  startDateTime: { type: Date, required: true }, // Start time
  endDateTime: { type: Date, required: true },   // End time

  type: { type: String, enum: ["Webinar", "Seminar", "Workshop"], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  meetingDetails: {
    meetingID: { type: String, unique: true, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of attendees
  },
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
