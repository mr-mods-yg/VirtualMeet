import React from 'react'
function EventComponent({ title, description, flag, image, start, end, isRegistered, submitHandler, isEventStarted, meetingID }) {
    return (
        <div className="card bg-medium-purple-500 text-white w-9/20 md:w-2/10 card-sm md:card-md shadow-xs m-2 shadow-medium-purple-700">
            <figure>
                <img
                    className='w-full h-35 sm:h-40 md:h-40 lg:h-50'
                    src={image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title flex-col">
                    {title}
                    <div className="badge bg-medium-purple-200">{flag}</div>
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-center">
                    <div className="p-2 text-bold">starts at: {start}</div>
                    <div className="p-2">ends at : {end}</div>
                </div>
                {!isRegistered ?
                    <>
                        <button className="btn btn-primary p-4 m-2 rounded-lg bg-medium-purple-600" onClick={submitHandler} type="button">Register</button>
                    </>
                    : isEventStarted ? 
                    <>
                        <button className="btn btn-disabled rounded-lg text-medium-purple-300" type="button">Registered</button>
                        <a className="btn btn-primary rounded-lg bg-medium-purple-600" href={'/meeting?roomID='+meetingID}>Join Meeting</a>
                    </> 
                    : <>
                        <button className="btn btn-disabled rounded-lg text-medium-purple-300" type="button">Registered</button>
                    </>
                }

            </div>
        </div>
    )
}

export default EventComponent
