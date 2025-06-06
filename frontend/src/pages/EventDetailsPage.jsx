import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';
import { format } from 'date-fns';
import useEventStore from '../store/eventStore';
import useUserStore from '../store/userStore';

const EventDetailsPage = () => {
    const { registerEvent } = useEventStore();
    const { id } = useUserStore();

    const params = useParams();
    const navigate = useNavigate();
    const eventId = params.id;
    const [eventInfo, setEventInfo] = useState();

    useEffect(() => {
        if (!eventId) {
            toast.error("Event ID not found!");
            navigate("/dashboard");
            return;
        }

        axiosInstance.post("/event/eventInfo", { eventId })
            .then((res) => setEventInfo(res.data))
            .catch(() => toast.error("Failed to load event info"));
    }, [navigate, eventId]);

    if (!eventInfo) return <>Loading...</>;

    const start = new Date(eventInfo.startDateTime);
    const end = new Date(eventInfo.endDateTime);
    const currTime = new Date();

    const isEventStarted = currTime >= start && currTime <= end;
    // const isEventCompleted = currTime > end;
    const isEventCompleted = true;

    const attendees = eventInfo.meetingDetails.attendees;
    const isRegistered = attendees.some(att => att._id === id);
    const host = attendees.find(att => att._id === eventInfo.createdBy);

    return (
        <div className="p-6 space-y-6 text-black max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">{eventInfo.title}</h1>
            <img src={eventInfo.thumbnail} alt={eventInfo.title} className="w-full max-h-96 object-contain rounded-lg" />
            
            <p><strong>Description:</strong> {eventInfo.description}</p>
            <p><strong>Type:</strong> {eventInfo.type}</p>
            <p><strong>Starts:</strong> {format(start, "PPP p")}</p>
            <p><strong>Ends:</strong> {format(end, "PPP p")}</p>
            <p><strong>Status:</strong> {isEventCompleted ? "Completed" : isEventStarted ? "Ongoing" : "Upcoming"}</p>
            {isEventCompleted? <p>{attendees.length} user(s) attended this event</p> : <p>{attendees.length} user(s) have been registered for the event</p>}

            {
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await toast.promise(
                        registerEvent(eventInfo._id),
                        {
                            loading: 'Registering...',
                            success: <b>Successfully Registered!</b>,
                            error: <b>Could not register right now!</b>,
                        }
                    );
                    const res = await axiosInstance.post("/event/eventInfo", { eventId });
                    setEventInfo(res.data);
                }}>
                    {
                        !isEventCompleted ? !isRegistered ? <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold">
                        Register for Event
                    </button> : <button className="px-4 py-2 rounded-md bg-medium-purple-600 text-gray-300 font-semibold" disabled>
                        Already Registered
                    </button> : <></>
                    }
                    
                </form>
            }

            <div className="space-y-4 mt-8">
                <div>
                    <h2 className="text-xl font-semibold">Host: {host?.name}</h2>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;
