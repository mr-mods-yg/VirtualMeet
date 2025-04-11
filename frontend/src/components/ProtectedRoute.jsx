import React, { useEffect } from 'react'
import axiosInstance from '../lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import toast from 'react-hot-toast';

function ProtectedRoute(props) {
    const {id, setInfo, logout} = useUserStore();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            toast.error("You are not logged in!");
            navigate('/login');
            return;
        }
        axiosInstance.get("/user/me")  
            .then(response => {
                if(response.status==200){
                    setInfo(response.data.user);
                }
                else{
                    toast.error("you have to login again!");
                    navigate("/logout");
                }
            })
            .catch((err)=>{
                toast.error("Error :"+err.message);
                navigate("/logout");
            })
    }, [setInfo, navigate, logout]);

    if(id==""){
        return <p>Loading..</p>;
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default ProtectedRoute
