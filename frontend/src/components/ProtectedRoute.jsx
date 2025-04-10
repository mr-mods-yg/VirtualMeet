import React, { useEffect } from 'react'
import axiosInstance from '../lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

function ProtectedRoute(props) {
    const {id, setInfo} = useUserStore();
    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.get("/user/me")  
            .then(response => {
                if(response.status==200){
                    setInfo(response.data.user);
                }
                else{
                    navigate("/");
                }
            })
            .catch((err)=>{
                console.log(err.message);
                navigate("/");
            })
    }, [setInfo, navigate]);

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
