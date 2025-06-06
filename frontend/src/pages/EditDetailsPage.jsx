import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

function EditDetailsPage() {
    let params = useParams()
    const checkboxRef = useRef(null);
    const [eventThumbnail, setEventThumbnail] = useState(null);
    const [eventTitle, setEventTitle] = useState(null);
    const [eventDescription, setEventDescription] = useState(null);
    const [eventType, setEventType] = useState(null);
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);
    const eventThumbnailInputRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);
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
    const start = new Date(eventInfo.startDateTime);
    const end = new Date(eventInfo.endDateTime);
    // console.log(start)
    // console.log(end)
    // console.log(start.toISOString())
    // console.log(end.toISOString())

    const imageChangeHandler = (e) => {
        if (e.target.files.length == 0) {
            console.log("no files selected!")
        }
        else {
            const selectedFile = e.target.files[0];
            console.log("File Selected : " + selectedFile.name);
            setEventThumbnail(selectedFile);
        }
    }
    const imageRemoveHandler = () => {
        if (eventThumbnailInputRef.current) eventThumbnailInputRef.current.value = "";
        setEventThumbnail(null);
        console.log("File Selected : " + null);
    }

    const onUpdateButtonClickHandler = async (e) => {
        setSubmitting(true);
        e.preventDefault();
        const formData = {
            eventId: eventInfo._id
        };
        if (eventTitle) formData.eventTitle = eventTitle;
        if (eventDescription) formData.eventDescription = eventDescription;
        if (eventType) formData.eventType = eventType;
        if (eventThumbnail) formData.file = eventThumbnail;
        if (startDateTime) formData.startDateTime = new Date(startDateTime).toISOString();
        if (endDateTime) formData.endDateTime = new Date(endDateTime).toISOString();
        if(formData.endDateTime){
            if(formData.startDateTime){
                if(new Date(formData.startDateTime) >= new Date(formData.endDateTime)){
                    toast.error("Start date and time must be before end date and time!");
                    setSubmitting(false);
                    return;
                }
            }
            else{
                if(new Date(toDatetimeLocal(start)) >= new Date(formData.endDateTime)){
                    toast.error("Start date and time must be before end date and time!");
                    setSubmitting(false);
                    return;
                }
            }
        }
        // LOGS
        // console.log(eventTitle);
        // console.log(eventDescription);
        // console.log(eventType);
        // console.log(eventThumbnail);

        // if(startDateTime){
        //     const startDateTimeUTC = new Date(startDateTime).toISOString();
        //     console.log(startDateTimeUTC);
        // }
        // else{
        //     console.log(endDateTime);
        // }

        // if(endDateTime){
        //     const endDateTimeUTC = new Date(endDateTime).toISOString();
        //     console.log(endDateTimeUTC);
        // }
        // else{
        //     console.log(endDateTime);
        // }

        try {
            const res = await axiosInstance.put("/event/update", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (res.status === 200) {
                toast.success("Event updated successfully!");
                navigate("/event/me/"+eventInfo._id);
            } else {
                toast.error("Failed to update event! Please try again later.");
            }
        } catch (error) {
            console.error("Error updating event:", error);
            toast.error("Error updating event! Please try again later.");
        }
        setSubmitting(false);
    }
    const onDeleteHandler = async (e)=>{
        e.preventDefault();
        if (!checkboxRef.current.checked) {
            toast.error("Please check the checkbox to confirm deletion!");
            return;
        }
        try {
            const res = await axiosInstance.delete("/event/delete", {
            data: {
                eventId: eventInfo._id
            }})
            if (res.status === 200) {
                toast.success("Event deleted successfully!");
                navigate("/event/me"); // Redirect to My Events page after deletion
            } else {
                toast.error("Failed to delete event! Please try again later.");
            }
        }
         catch (error) {
            console.error("Error deleting event:", error);
            toast.error("Error deleting event! Please try again later.");
        }
        
    }
    return (
        <div className="flex justify-center items-center min-h-screen font-poppins">
            <dialog id="my_modal_2" className="modal">
                <div className="flex flex-col modal-box gap-y-2">
                    <h3 className="font-bold text-lg">Warning!</h3>
                    <p className="text-red-500">This action will completely delete the exisiting event</p>
                    <div class="tenor-gif-embed" data-postid="6214629" data-share-method="host" data-aspect-ratio="1.795" data-width="100%"><a href="https://tenor.com/view/delete-computer-recycle-recyclebin-internet-gif-6214629">Delete Computer GIF</a>from <a href="https://tenor.com/search/delete-gifs">Delete GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
                    <label className="label">
                        <input type="checkbox" ref={checkboxRef} defaultChecked={false} className="checkbox" />
                        Yes I understand that the event will be permanently deleted
                    </label>
                    <br />
                    <div className="flex justify-center gap-x-2">
                        <button className="btn mt-2 hover:bg-red-400" onClick={onDeleteHandler}>Delete Permanently</button>
                    </div>
                    <div className="text-center text-sm text-gray-400">Note: Click anywhere outside the card to cancel it</div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <fieldset onSubmit={(e) => {
                e.preventDefault()
            }} className="fieldset bg-medium-purple-500 border-base-300 rounded-box w-full max-w-2xl border p-8 shadow-lg text-lg">
                <legend className="fieldset-legend text-xl font-bold text-medium-purple-100">Event details</legend>

                <label className="label mt-4">Event Title</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    defaultValue={eventInfo.title}
                    onChange={(e) => {
                        if (e.target.value != eventInfo.title) setEventTitle(e.target.value);
                        else setEventTitle(null);
                    }}
                />

                <label className="label mt-4">Event Description</label>
                <textarea
                    rows={7}
                    className="textarea textarea-bordered w-full"
                    wrap="hard"
                    defaultValue={eventInfo.description}
                    onChange={(e) => {
                        if (e.target.value != eventInfo.description) setEventDescription(e.target.value);
                        else setEventDescription(null);
                    }}
                />

                <label className="label mt-4">Event Type</label>
                <select
                    defaultValue={eventInfo.type}
                    className="select select-bordered rounded-xl w-full"
                    onChange={(e) => {
                        if (e.target.value != eventInfo.type) setEventType(e.target.value);
                        else setEventType(null);
                    }}
                >
                    <option disabled={true}>Select Event Type</option>
                    {["Webinar", "Seminar", "Workshop"].map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>

                <label className="label mt-4">Event Thumbnail (Optional if thumbnail already added)</label>
                {eventThumbnail ? <div className='flex'>
                    <img className='h-auto'
                        src={URL.createObjectURL(eventThumbnail)} />
                    <button className='p-1' onClick={imageRemoveHandler}><Trash2 className='p-0.5  border-1 rounded-md hover:bg-secondary' /></button>
                </div> : <img className="h-auto" src={eventInfo.thumbnail}></img>}
                <input type="file" className="w-full file-input rounded-xl" onChange={imageChangeHandler} accept="image/*" ref={eventThumbnailInputRef} />

                <label className="label mt-4">Event Starts At</label>
                <input
                    type="datetime-local"
                    className="input input-bordered w-full"
                    defaultValue={toDatetimeLocal(start)}
                    onChange={(e) => {
                        setStartDateTime(e.target.value);
                    }}
                />

                <label className="label mt-4">Event Ends At</label>
                <input
                    type="datetime-local"
                    className="input input-bordered w-full"
                    min={startDateTime? toDatetimeLocal(startDateTime): toDatetimeLocal(start)}
                    defaultValue={toDatetimeLocal(end)}
                    onChange={(e) => {
                        setEndDateTime(e.target.value);
                    }}
                />

                <div className="text-center">
                    <button className={"btn rounded-xl btn-primary p-4 m-2 bg-medium-purple-600"} type='none' onClick={onUpdateButtonClickHandler} disabled={submitting? true : false}>{submitting? "Updating..." : "Update"}</button>
                    <button className={"btn rounded-xl btn-primary p-4 m-2 bg-medium-purple-600"} type='none' onClick={() => {
                        navigate("/dashboard");
                    }}>Cancel</button>
                    <button className={"btn rounded-xl btn-primary p-4 m-2 bg-red-600"} type='none' onClick={()=>{
                        document.getElementById('my_modal_2').showModal()
                    }}>Delete</button>
                </div>
            </fieldset>
        </div>

    )
}

function toDatetimeLocal(isoString) {
    const date = new Date(isoString);
    // Get local date/time parts and pad with zeros if needed
    const pad = (n) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default EditDetailsPage
