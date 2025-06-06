import React from 'react'

function EventComponent({ id, title, flag, image, start, isRegistered, submitHandler, isEventStarted, meetingID, showAttendeesButton }) {
    return (
        <div className="card bg-medium-purple-500 text-white w-9/20 max-w-md md:max-w-lg lg:max-w-md card-sm md:card-md shadow-xs m-1 md:m-2 shadow-medium-purple-700 hover:cursor-pointer hover:scale-103 transition-transform duration-200 ease-in-out overflow-clip"
            onClick={() => {
                window.location.href = "/event/" + id;
            }}
        >
            <figure>
                <img
                    className='w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-lg'
                    src={image} 
                    alt={title} />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title flex-col">
                    {title}
                    <div className="badge bg-medium-purple-200 text-medium-purple-800 mt-2">{flag}</div>
                </h2>
                <div className="p-2 card-actions justify-center text-xs md:text-sm">
                    <div className='text-bold'>starts {start}</div>
                </div>
                {!isRegistered ? (
                    <button className="btn btn-primary p-3 mt-4 rounded-lg bg-medium-purple-600 w-full md:w-auto" onClick={submitHandler} type="button">Register</button>
                ) : isEventStarted ? (
                    <>
                        <button className="btn btn-disabled rounded-lg text-medium-purple-300 w-full md:w-auto" type="button">Registered</button>
                        <a className="btn btn-primary rounded-lg bg-medium-purple-600 w-full md:w-auto mt-2 md:mt-0 md:ml-2 block md:inline-block text-center" href={'/meeting?roomID=' + meetingID}>Join Meeting</a>
                    </>
                ) : (
                    <button className="btn btn-disabled rounded-lg text-medium-purple-300 w-full" type="button">Registered</button>
                )}
                {showAttendeesButton && (
                    <>
                    <a className="btn btn-primary p-3 rounded-lg bg-medium-purple-600 w-full text-center" href={'/event/me/' + id}>Show Event Details</a>
                    <a className="btn btn-primary p-3 rounded-lg bg-medium-purple-600 w-full text-center" href={'/event/edit/' + id}>Edit Event Details</a>
                    </>
                )}
            </div>
        </div>
    )
}

export default EventComponent
