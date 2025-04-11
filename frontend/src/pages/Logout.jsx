import React, { useEffect } from 'react'
import useUserStore from '../store/userStore'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { logout } = useUserStore();
    const navigate = useNavigate();
    useEffect(()=>{
        logout();
        navigate("/login");
    }, [logout, navigate]);
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='flex-col text-center'>
                <div className="text-2xl m-5">See you again!</div>
            </div>
        </div>
    )
}

export default Logout
