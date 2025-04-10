import React, { useEffect } from 'react'
import axiosInstance from '../lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

function Login() {
    const navigate = useNavigate();
    const { setInfo } = useUserStore();
    useEffect(() => {
        axiosInstance.get("/user/me")
            .then(response => {
                if (response.status == 200) {
                    setInfo(response.data.user);
                    navigate("/dashboard");
                }
            })
            .catch(() => {
                console.log("User not logged in!");
            })
    }, [setInfo, navigate]);
    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_BACKEND_URI + "/auth/google"; // Redirect to backend OAuth route
    };

    return (
        <div className='flex justify-center items-center h-full'>
            <div className='flex-col text-center'>
                <div className="text-2xl m-5">Login/Register!</div>
                <button className="btn bg-white text-black border-[#e5e5e5]" onClick={handleGoogleLogin}>
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Continue with Google
                </button>
            </div>
        </div>
    );
}

export default Login
