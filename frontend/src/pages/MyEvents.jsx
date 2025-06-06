import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { format } from "date-fns";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";
import useEventStore from "../store/eventStore";
import EventComponent from "../components/EventComponent";
import Footer from "../components/Footer";

function MyEvents() {
    const { id, name } = useUserStore();
    const { registerEvent } = useEventStore();
    const [events, setEvents] = useState([]);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance
            .get(
                "/event/getMyEvents" +
                    (showPastEvents ? "?showPastEvents=true" : "")
            )
            .then((res) => {
                setEvents(res.data);
            });
        setLoading(false);
    }, [showPastEvents]);

    const showPastEventsHandler = (e) => {
        const showPastEvents = e.target.checked;
        setShowPastEvents(showPastEvents);
    };

    const onFilterChangeHandler = (e) => {
        if (e.target.value == "×") {
            axiosInstance
                .get(
                    "/event/getMyEvents" +
                        (showPastEvents ? "?showPastEvents=true" : "")
                )
                .then((res) => {
                    setEvents(res.data);
                });
        } else {
            let filteredEvents = events.filter(
                (event) => event.type == e.target.value
            );
            setEvents(filteredEvents);
        }
    };
    return (
        <div className="bg-medium-purple-400">
            <div className="flex justify-center h-full m-5">
                <div className="flex-col text-center">
                    <div className="text-3xl mt-10 mb-5">
                        Welcome back {name}!
                    </div>
                    <div className="bg-medium-purple-300 rounded-xl p-3 mt-3">
                        <p className="p-1">Filter By</p>
                        <div className="flex bg-white mx-5 my-2 p-1 rounded-xl gap-2 justify-center items-center">
                            <input
                                type="checkbox"
                                className="toggle"
                                onChange={showPastEventsHandler}
                            />
                            Show past events
                        </div>
                        <form
                            className="filter flex justify-center"
                            onClick={onFilterChangeHandler}
                        >
                            <input
                                className="btn btn-square"
                                type="reset"
                                value="×"
                            />
                            <input
                                className="btn"
                                type="radio"
                                name="frameworks"
                                aria-label="Workshop"
                                value={"Workshop"}
                            />
                            <input
                                className="btn"
                                type="radio"
                                name="frameworks"
                                aria-label="Seminar"
                                value={"Seminar"}
                            />
                            <input
                                className="btn"
                                type="radio"
                                name="frameworks"
                                aria-label="Webinar"
                                value={"Webinar"}
                            />
                        </form>
                    </div>
                    {/* <input type="text" onChange={inputChangeHandler} className="input input-primary input-xl" placeholder='Search Events' /> */}
                </div>
            </div>
            {/* Cards */}
            <div className="flex justify-center space-x-2 md:space-x-3 lg:space-x-4 flex-wrap">
                {loading ? (
                    <>
                        <div className="skeleton h-100 w-9/20 max-w-md md:max-w-lg lg:max-w-md card-sm md:card-md" />
                        <div className="skeleton h-100 w-9/20 max-w-md md:max-w-lg lg:max-w-md card-sm md:card-md" />
                        <div className="skeleton h-100 w-9/20 max-w-md md:max-w-lg lg:max-w-md card-sm md:card-md" />
                    </>
                ) : (
                    ""
                )}

                {events.map((event) => {
                    const attendees = event.meetingDetails.attendees;
                    const isRegistered = attendees.includes(id) ? true : false;
                    const start = new Date(event.startDateTime);
                    const end = new Date(event.endDateTime);
                    const currTime = new Date();

                    let isEventStarted = false;
                    if (currTime >= start && currTime <= end) {
                        isEventStarted = true;
                    }

                    return (
                        <EventComponent
                            key={event._id}
                            id={event._id}
                            title={event.title}
                            description={event.description}
                            image={event.thumbnail}
                            flag={event.type}
                            start={format(start, "PPP p")}
                            end={format(end, "PPP p")}
                            isRegistered={isRegistered}
                            isEventStarted={isEventStarted}
                            meetingID={event.meetingDetails.meetingID}
                            showAttendeesButton={true}
                            submitHandler={async (e) => {
                                e.preventDefault();
                                await toast.promise(registerEvent(event._id), {
                                    loading: "Registering for the event...",
                                    success: <b>Succesfully Registered!</b>,
                                    error: (
                                        <b>Could not registered right now!</b>
                                    ),
                                });
                                axiosInstance
                                    .get("/event/getMyEvents")
                                    .then((res) => {
                                        setEvents(res.data);
                                    });
                            }}
                        />
                    );
                })}
                {/* <EventComponent 
          title={"hello"} 
          description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo, temporibus aspernatur possimus, ab tempora soluta voluptate neque dolorum aut labore perspiciatis hic quia numquam nesciunt nihil iste voluptatibus? Sit, aperiam?"}
          flag={"hello world"}/> */}
            </div>
            <Footer />
        </div>
    );
}

export default MyEvents;
