import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import EventComponent from "../components/EventComponent";
import axiosInstance from "../lib/axiosInstance";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import useEventStore from "../store/eventStore";
import { Search } from "lucide-react";
import Footer from "../components/Footer";

function HomePage() {
    const { id, name } = useUserStore();
    const { registerEvent } = useEventStore();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosInstance.get("/event/getAll").then((res) => {
            setEvents(res.data);
        });
        setLoading(false);
        setInterval(() => {
            axiosInstance.get("/event/getAll").then((res) => {
                setEvents(res.data);
            });
        }, 60 * 1000); // refresh after every minute
    }, []);

    let timer;
    const inputChangeHandler = (e) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            axiosInstance
                .get(`/event/getAll?filter=${e.target.value}`)
                .then((res) => {
                    setEvents(res.data);
                });
        }, 1000);
    };

    const onFilterChangeHandler = (e) => {
        if (e.target.value == "×") {
            axiosInstance.get(`/event/getAll`).then((res) => {
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
        <div className="bg-medium-purple-400 flex flex-col min-h-screen">
            <div className="flex justify-center h-full m-5">
                <div className="flex-col text-center">
                    <div className="text-3xl mt-10 mb-5">
                        Welcome back {name}!
                    </div>

                    <label className="input">
                        <Search color="grey" />
                        <input
                            type="search"
                            onChange={inputChangeHandler}
                            className="input-lg"
                            required
                            placeholder="Search Events"
                        />
                    </label>

                    <div className="bg-medium-purple-300 rounded-xl p-3 mt-3">
                        <p className="p-1">Filter By</p>
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
                            submitHandler={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await toast.promise(registerEvent(event._id), {
                                    loading: "Registering for the event...",
                                    success: <b>Succesfully Registered!</b>,
                                    error: (
                                        <b>Could not registered right now!</b>
                                    ),
                                });
                                axiosInstance
                                    .get("/event/getAll")
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

export default HomePage;
