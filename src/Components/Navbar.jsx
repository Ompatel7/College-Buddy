import React from 'react'
import logo from '@/assets/Logo.png';
import signin from '@/assets/Signinlogo.jpg'
import loggedin from '@/assets/Loggedin.jfif'
import { Link } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { MdOutlineWatchLater } from "react-icons/md";

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  
  return (
    <div className='flex justify-between items-center shadow-sm p-2 mx-2 border-b'>
      <div className='rounded'>
        <Link to={'/'}>
        <img src={logo} alt="" width="140px" height="33px" className='rounded'/>
        </Link>
      </div>

      <div>
        {
        user ? 
        <div className='flex justify-center items-center gap-2'>
       
        <Link to={'my-searches'}>
        <div className='border-2 rounded-lg p-1.5 flex items-center'>
         my last Searches
       <MdOutlineWatchLater/> 
        </div>
        </Link>
        <Popover>
          <PopoverTrigger>
          <img src={user?.picture ? user?.picture : loggedin} className='border-2 rounded h-10 w-10'/>
          </PopoverTrigger>
          <PopoverContent>
            <button onClick={()=>{
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }}>
            Click here to Logout
            </button>
          </PopoverContent>
        </Popover>

        </div> 
        :
        <Link to={'/login'}>
        <div className='flex gap-1'>
          <p className='font-bold'>Sign In</p>
          <img src={signin} className='rounded' height="30px" width="30px"/>
        </div>
        </Link>
        }
      </div>
    </div>
  )
}

export default Navbar