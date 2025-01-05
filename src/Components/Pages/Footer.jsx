import React from 'react'
import { Link} from 'react-router-dom'

function Footer() {


  return (
    <div className='bg-[#231f20]'>
    <div className="bg-yellow-300 h-1"></div>
      <footer className="w-[90%] mx-auto pb-10 text-white grid grid-rows-1 px-6 pt-[3.75rem] text-left">
            <h2 className='text-lg underline underline-offset-4 decoration-2 lg'>College Buddy</h2>
               <div>
                  <ul>
                    <Link to={'/help'}><li className="py-[0.38rem]"><p className='hover:underline'>Help</p></li></Link>
                    <Link to={'/help'}><li className="py-[0.38rem]"><p className='hover:underline'>About us</p></li></Link>
                    <Link to={'/error'}><li className="py-[0.38rem]"><p className='hover:underline'>Contact us</p></li></Link>
                    <Link to={'/error'}><li className="py-[0.38rem]"><p className='hover:underline'>College Buddy Blog</p></li></Link>
                    <Link to={'/error'}><li className="py-[0.38rem]"><p className='hover:underline'>College Buddy Foundation</p></li></Link>
                  </ul>
               </div>
         
   </footer>
    </div>
  )
}

export default Footer