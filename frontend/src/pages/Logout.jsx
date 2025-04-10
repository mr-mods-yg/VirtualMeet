import React, { useEffect } from 'react'
import useUserStore from '../store/userStore'

function Logout() {
    const { logout } = useUserStore();
    useEffect(logout, [logout]);
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='flex-col text-center'>
                <div className="text-2xl m-5">See you again!</div>
            </div>
        </div>
    )
}

export default Logout
