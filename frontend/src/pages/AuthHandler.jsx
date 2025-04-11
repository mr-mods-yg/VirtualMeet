import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from "react-router";
import axiosInstance from '../lib/axiosInstance';
import useUserStore from '../store/userStore';

function AuthHandler() {
  const [query,] = useSearchParams()
  const { setInfo } = useUserStore();
  const navigate = useNavigate()
  useEffect(() => {
    const token = query.get('token');
    if (!token) {
      toast.error("auth credentials not found!");
      navigate('/login');
    }
    localStorage.setItem("token", token);
    axiosInstance.get('/user/me').then((res) => {
      const statusCode = res.status;
      if (statusCode == 200) {
        setInfo(res.data.user);
        navigate('/dashboard');
        return;
      }
      else {
        toast.error("Unknown Error: Please login again!");
        navigate("/logout");
      }
    }).catch((err) => {
      if (err.response) {
        const statusCode = err.response.status;
        if (statusCode == 401 || statusCode == 403) {
          toast.error("Error : " + err.response.data.message);
          navigate("/logout");
          return;
        }
      }
      // logout the user
      toast.error("Please login again!");
      navigate("/logout");
    })
  }, [query, navigate, setInfo]);

  return (
    <div>
      {"Processing your request..."}
    </div>
  )
}

export default AuthHandler
