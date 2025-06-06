import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../lib/axiosInstance';
import { format } from 'date-fns';
import MyEventDetails from '../components/MyEventDetails';

const MyEventPage = () => {
    let params = useParams()
    const navigate = useNavigate();
    const eventId = params.id;
    const [eventInfo, setEventInfo] = useState();

    useEffect(() => {
        if (!eventId) {
            toast.error("event id not found!");
            navigate("/dashboard");
        }

        axiosInstance.post("/event/eventInfo", {
            eventId
        }).then((res) => {
            setEventInfo(res.data)
        })

    }, [navigate, eventId])

    if (!eventInfo) {
        return <>Loading..</>
    }
    let x = 1;
    const start = new Date(eventInfo.startDateTime);
    const end = new Date(eventInfo.endDateTime);
    const currTime = new Date();

    let isEventCompleted = false;
    let isEventStarted = false;

    if (currTime >= start && currTime <= end) {
        isEventStarted = true;
    }

    if (currTime > end) {
        isEventCompleted = true;
    }

    const attendees = eventInfo.meetingDetails.attendees;
    return (
        <div className='p-6 space-y-6 text-black max-w-4xl mx-auto'>
            <h1 className="text-3xl font-bold">{eventInfo.title}</h1>
            <img src={eventInfo.thumbnail} alt={eventInfo.title} className="w-full max-h-96 object-fill rounded-lg" />
            <p><strong>Description:</strong> {eventInfo.description}</p>
            <p><strong>Type:</strong> {eventInfo.type}</p>
            <p><strong>Start:</strong> {format(start, "PPP p")}</p>
            <p><strong>End:</strong> {format(end, "PPP p")}</p>
            <p><strong>Status:</strong> {isEventCompleted ? "Completed" : isEventStarted ? "Ongoing" : "Upcoming"}</p>
            <p><strong>Meeting ID:</strong> {eventInfo.meetingDetails.meetingID}</p>
            <p className='flex items-center gap-x-2'><strong>Public URL: </strong> <button className='btn btn-sm btn-dash' onClick={(e)=>{
                e.preventDefault();
                navigator.clipboard.writeText(window.location.origin +"/event/"+ eventInfo._id);
                toast.success("copied to clipboard!");
            }}>click to copy</button></p>
            {isEventCompleted ? <p>{attendees.length} user(s) attended this event</p> : <p>{attendees.length} user(s) have been registered for the event</p>}
            {/* {JSON.stringify(eventInfo)} */}
            {/* <MyEventDetails
                key={eventInfo._id}
                title={eventInfo.title}
                description={eventInfo.description}
                image={eventInfo.thumbnail}
                flag={eventInfo.type}
                start={format(start, "PPP p")}
                end={format(end, "PPP p")}
                isEventStarted={isEventStarted}
                isEventCompleted={isEventCompleted}
            /> */}
            <div className=''>
                <p className='text-bold text-3xl m-5'>Event Attendees</p>
                {/* TABLE SECTION */}
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-medium-purple-500 p-3">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendees.map((attendee) => <tr key={attendee._id}>
                                <th>{x++}</th>
                                <td>{attendee.name}</td>
                                <td>{attendee.email}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default MyEventPage
