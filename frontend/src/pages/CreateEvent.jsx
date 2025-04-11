import { Mail, Trash2, User } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { getLocalDateTime } from '../lib/localdatetime';
import useEventStore from "../store/eventStore";
import toast from 'react-hot-toast';
function CreateEvent() {
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventType, setEventType] = useState("Webinar");
    const [eventThumbnail, setEventThumbnail] = useState(null);
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const eventThumbnailInputRef = useRef(null);
    const [currTime, setCurrTime] = useState(getLocalDateTime());
    const {createEvent} = useEventStore()
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        // console.log(eventTitle)
        // console.log(eventDescription)
        // console.log(eventType)
        // console.log(eventThumbnail);
        // console.log(startDateTime)
        // console.log(endDateTime)
        const startDateTimeUTC = new Date(startDateTime).toISOString();
        const endDateTimeUTC = new Date(endDateTime).toISOString();
        // console.log(startDateTimeUTC);
        // console.log(endDateTimeUTC);

        const formData = new FormData();
        formData.append("eventTitle", eventTitle);
        formData.append("eventDescription", eventDescription);
        formData.append("eventType", eventType);
        formData.append("file", eventThumbnail);
        formData.append("startDateTime", startDateTimeUTC);
        formData.append("endDateTime", endDateTimeUTC);
        toast.promise(
            createEvent(formData),
             {
               loading: 'Creating Event...',
               success: <b>Event created!</b>,
               error: <b>Event could not be created!</b>,
             }
        ); 
    }
    useEffect(()=>{
        setInterval(()=>{
            setCurrTime(getLocalDateTime())

        }, 10000);
    }, [setCurrTime])

    const imageChangeHandler = (e)=>{
        if(e.target.files.length==0){
            console.log("no files selected!")
        }
        else{
            const selectedFile = e.target.files[0];
            console.log("File Selected : "+selectedFile.name);
            setEventThumbnail(selectedFile);
        }
    }
    const imageRemoveHandler = ()=> {
        if(eventThumbnailInputRef.current) eventThumbnailInputRef.current.value="";
        setEventThumbnail(null);
        console.log("File Selected : "+null);
    }
    return (
        <div className='flex justify-center h-full'>
            <div className='flex-col text-center'>
                <div className="text-center p-5">
                    <h1 className="text-2xl font-semibold ">Create your Event</h1>
                    <p className="mt-2"></p>
                </div>
                <div className="space-y-6">
                    <form onSubmit={onSubmitHandler}>
                        <div className="space-y-1.5 max-w-screen sm:w-75 mb-3">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                Event Title
                            </div>
                            <input type="text" onChange={(e)=>{
                                setEventTitle(e.target.value);
                            }} placeholder="Enter event title" class="input input-secondary" />
                        </div>
                        <div className="space-y-1.5 max-w-screen sm:w-75 mb-3">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                Event Description
                            </div>
                            <input type="text" onChange={(e)=>{
                                setEventDescription(e.target.value);
                            }} placeholder="Enter event description" class="input input-secondary" />
                        </div>
                        <div className="space-y-1.5 max-w-screen sm:w-75 mb-3">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                Event Type
                            </div>
                            <select defaultValue="Webinar" className="select select-secondary" onChange={(e)=>{
                                setEventType(e.target.value)
                            }}>
                                <option disabled={true}>Select Event Type</option>
                                {["Webinar", "Seminar", "Workshop"].map((item)=><option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5 max-w-screen sm:w-75 mb-3">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                Event Thumbnail
                            </div>
                            <input type="file" className="file-input file-input-secondary" onChange={imageChangeHandler} accept="image/*" ref={eventThumbnailInputRef}/>
                            {eventThumbnail ? <div className='flex'>
                            <img className='h-auto'
                            src={URL.createObjectURL(eventThumbnail)} />
                            <button className='p-1' onClick={imageRemoveHandler}><Trash2 className='p-0.5  border-1 rounded-md hover:bg-secondary' /></button>
                            </div> : <></>}
                        </div>
                    
                        <div className="space-y-1.5 max-w-screen sm:w-75 mb-3">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                Event Start Date Time
                            </div>
                            <input className="input input-secondary" type="datetime-local" onChange={(e)=>
                                setStartDateTime(e.target.value)
                            } min={currTime}/>
                        </div>
                        <div className="space-y-1.5 max-w-screen sm:w-75 mb-3">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                Event End Date Time
                            </div>
                            <input className="input input-secondary" type="datetime-local" onChange={(e)=>
                                setEndDateTime(e.target.value)
                            } min={currTime}/>
                        </div>
                        <div className="space-x-5 max-w-screen sm:w-75 mb-3">
                            <button className="btn btn-secondary" type='none'>Submit</button>
                            <a className="btn btn-secondary" href='/dashboard'>Cancel</a>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent
