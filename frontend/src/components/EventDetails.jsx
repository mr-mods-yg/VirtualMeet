function EventDetails({ title, description, flag, image, start, end, isEventStarted, isEventCompleted, isRegistered, submitHandler, meetingID }) {
    return (
        <div className="card bg-medium-purple-500 text-white w-15/20 max-w-110 card-sm sm:card-md shadow-xs m-2 shadow-medium-purple-700">
            <figure>
                <img
                    className='w-full h-45 sm:h-50 lg:h-60'
                    src={image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title flex-col">
                    {title}
                    <div className="badge bg-medium-purple-200">{flag}</div>
                </h2>
                <p className=''>{description}</p>
                <div className="p-2 card-actions justify-center italic">
                    <div className="">starts at: {start}</div>
                    <div className="">ends at : {end}</div>
                </div>
                <p className='text-center'>{isEventStarted ? "Event is live!" : isEventCompleted ? "Event is already completed!" : "Event is not started yet!"}</p>
                

            </div>
            {!isRegistered ?
                <>
                    <button className="btn btn-primary p-4 m-2 rounded-lg bg-medium-purple-600" onClick={submitHandler} type="button">Register</button>
                </>
                : isEventStarted ?
                    <>
                        <button className="btn btn-disabled rounded-lg m-1 text-medium-purple-300" type="button">Registered</button>
                        <a className="btn btn-primary rounded-lg bg-medium-purple-600" href={'/meeting?roomID=' + meetingID}>Join Meeting</a>
                    </>
                    : <>
                        <button className="btn btn-disabled rounded-lg m-1 text-medium-purple-300" type="button">Registered</button>
                    </>
            }
        </div>
    )
}

export default EventDetails