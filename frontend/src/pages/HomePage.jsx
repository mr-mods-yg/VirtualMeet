import React, { useEffect, useState } from 'react'
import useUserStore from '../store/userStore'
import EventComponent from "../components/EventComponent"
import axiosInstance from '../lib/axiosInstance';
import { format } from "date-fns";
import { toast } from 'react-hot-toast';
import useEventStore from '../store/eventStore';
function HomePage() {
  const { id, name } = useUserStore();
  const { registerEvent } = useEventStore();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosInstance.get("/event/getAll").then((res) => {
      setEvents(res.data);
    });
  }, [])

  let timer;
  const inputChangeHandler = (e) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      axiosInstance.get(`/event/getAll?filter=${e.target.value}`).then((res) => {
        setEvents(res.data);
      });
    }, 1000);
  }
  return (
    <div>
      <div className='flex justify-center h-full m-5'>
        <div className='flex-col text-center'>
          <div className="text-3xl mt-10 mb-5">Welcome back {name}!</div>
          <input type="text" onChange={inputChangeHandler} className="input input-primary input-xl" placeholder='Search Events' />
        </div>
      </div>

      {/* Cards */}
      <div className='flex justify-center space-x-2 md:space-x-3 lg:space-x-4 flex-wrap'>
        {events.map((event) => {
          const attendees = event.meetingDetails.attendees;
          const isRegistered = (attendees.includes(id)) ? true : false;
          const start = new Date(event.startDateTime);
          const end = new Date(event.endDateTime);
          const currTime = new Date();

          let isEventStarted = false;
          if(currTime>=start && currTime<=end){
            isEventStarted = true;
          }

          return <EventComponent
            key={event._id}
            title={event.title}
            description={event.description}
            image={event.thumbnail}
            flag={event.type}
            start={format(start, "Pp")}
            end={format(end, "Pp")}
            isRegistered={isRegistered}
            isEventStarted={isEventStarted}
            meetingID={event.meetingDetails.meetingID}
            submitHandler={async (e) => {
              e.preventDefault();
              await toast.promise(
                registerEvent(event._id),
                {
                  loading: 'Registering for the event...',
                  success: <b>Succesfully Registered!</b>,
                  error: <b>Could not registered right now!</b>,
                }
              );
              axiosInstance.get("/event/getAll").then((res) => {
                setEvents(res.data);
              });
            }}
          />
        })}
        {/* <EventComponent 
          title={"hello"} 
          description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo, temporibus aspernatur possimus, ab tempora soluta voluptate neque dolorum aut labore perspiciatis hic quia numquam nesciunt nihil iste voluptatibus? Sit, aperiam?"}
          flag={"hello world"}/> */}

      </div>
    </div>
  )
}

export default HomePage
