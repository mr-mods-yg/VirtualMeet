import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../lib/axiosInstance';
import { format } from 'date-fns';
import useEventStore from '../store/eventStore';
import useUserStore from '../store/userStore';
import EventDetails from '../components/EventDetails';

const EventDetailsPage = () => {
    const { registerEvent } = useEventStore();
    const { id } = useUserStore();

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
    console.log(eventInfo);
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
    console.log(attendees);
    const isRegistered = (attendees.find((event)=> event._id==id)) ? true : false;
    const host = attendees.find((attendee)=>attendee._id==eventInfo.createdBy);
    return (
        <div className='flex flex-wrap justify-around'>
            {/* {JSON.stringify(eventInfo)} */}
            <EventDetails
                key={eventInfo._id}
                title={eventInfo.title}
                description={eventInfo.description}
                image={eventInfo.thumbnail}
                flag={eventInfo.type}
                start={format(start, "PPP p")}
                end={format(end, "PPP p")}
                isEventStarted={isEventStarted}
                isEventCompleted={isEventCompleted}
                isRegistered={isRegistered}
                meetingID={eventInfo.meetingDetails.meetingID}
                submitHandler={async (e) => {
                    e.preventDefault();
                    await toast.promise(
                      registerEvent(eventInfo._id),
                      {
                        loading: 'Registering for the event...',
                        success: <b>Succesfully Registered!</b>,
                        error: <b>Could not registered right now!</b>,
                      }
                    );
                    axiosInstance.post("/event/eventInfo", {
                        eventId
                    }).then((res) => {
                        setEventInfo(res.data)
                    })
                  }
                }
            />
            <div className='m-5'>
                <p className='text-bold text-2xl p-2 outline-1 m-2 rounded-2xl'> Event Host : <br />{host.name} </p>
                <p className='text-bold text-2xl p-2 outline-1 m-2 rounded-2xl'> Event Attendees : <br /> <ul>{attendees.map((attendee)=> <li key={attendee._id}>{attendee.name}</li>)}</ul> </p>
            </div>
        </div>
    )
}


export default EventDetailsPage
