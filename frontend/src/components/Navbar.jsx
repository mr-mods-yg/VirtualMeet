import React from 'react'
import { LogOut } from "lucide-react";
import useUserStore from '../store/userStore';

function Navbar({ title }) {
  const { id, name } = useUserStore();
  const avatarURL = "https://api.dicebear.com/9.x/initials/svg?seed="+name
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href={id === "" ? '/' : '/dashboard'}>{title}</a>
      </div>
      {id === "" ? <></> : 
      <div className=" dropdown dropdown-end">
      {window.location.pathname=='/dashboard' ? <a className='m-3 btn btn-primary' href='/event/create'>Create Event</a>: <></>}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-13">
        <div className="rounded-full">
          <img
            style={{
              width: 47
            }}
            src={avatarURL}
            alt="avatar"/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
        <li><a className='text-primary' href='/profile'>Profile</a></li>
        <li><a className='text-primary' href='/logout'>Logout <LogOut/></a></li>
      </ul>
    </div>
      }
      
    </div>
  )
}

export default Navbar
