import React from 'react'
function EventComponent({ title, description, flag, image, start, end, isRegistered, submitHandler, isEventStarted, meetingID }) {
    return (
        <div className="card bg-base-100 w-1/3 md:w-2/10 card-sm md:card-md shadow-sm">
            <figure>
                <img
                    className='w-auto h-47'
                    src={image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">{flag}</div>
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">starts at: {start}</div>
                    <div className="badge badge-outline">ends at : {end}</div>
                </div>
                {!isRegistered ?
                    <>
                        <button className="btn btn-primary" onClick={submitHandler} type="button">Register</button>
                    </>
                    : isEventStarted ? 
                    <>
                        <button className="btn btn-primary btn-disabled" type="button">Registered</button>
                        <a className="btn btn-primary" href={'/meeting?roomID='+meetingID}>Join Meeting</a>
                    </> 
                    : <>
                        <button className="btn btn-primary btn-disabled" type="button">Registered</button>
                    </>
                }

            </div>
        </div>
    )
}

export default EventComponent
