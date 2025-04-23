import React from 'react'
import { LogIn, LogOut } from "lucide-react";
import useUserStore from '../store/userStore';

function Navbar() {
  const { id, name, info } = useUserStore();
  const avatarURL = "https://api.dicebear.com/9.x/initials/svg?seed=" + name
  return (
    <div className="navbar bg-medium-purple-400 shadow-sm font-poppins">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-thin" href={'/'}>Virtual <span className='text-medium-purple-700'>Meet</span></a>
      </div>
      {id === "" ? <a className='btn btn-ghost text-lg gap-1.5' href='/login'><LogIn/>Login</a> :
        <div className=" dropdown dropdown-end">
          {window.location.pathname == '/dashboard' ? <a className=' btn btn-primary p-4 m-2 text-thin rounded-4xl bg-medium-purple-600' href='/event/create'>Create Event</a> : <a className=' btn btn-primary p-4 m-2 text-thin rounded-4xl bg-medium-purple-600' href='/dashboard'>Dashboard</a>}
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-13">
            <div className="rounded-full">
              <img
                style={{
                  width: 47
                }}
                src={info?.picture || avatarURL}
                alt="avatar" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
            <li><a className='text-primary' href='/profile'>Profile</a></li>
            <li><a className='text-primary' href='/dashboard'>Dashboard</a></li>
            <li><a className='text-primary' href='/logout'>Logout <LogOut /></a></li>
          </ul>
        </div>
      }
    </div>
  )
}

export default Navbar
