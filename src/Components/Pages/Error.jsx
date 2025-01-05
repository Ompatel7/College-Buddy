import React from 'react'
import { Link } from 'react-router-dom'


function Error() {
  
  return (
    <div className='mt-20 flex justify-center items-center flex-col'>
        <h1 className='text-xl mb-5'>We are Continuously collecting data this page is currently unavailable</h1>

       <Link to={'/'}><button className='p-2 rounded text-white hover:font-medium transition duration-200
       bg-blue-600 hover:bg-blue-700'>Go to Home Page</button></Link> 
        <div>
      
    </div>
    </div>
  )
}


export default Error