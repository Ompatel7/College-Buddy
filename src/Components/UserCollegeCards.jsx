import React from 'react'
import { Link } from 'react-router-dom'
// import useImage from '@/hooks/useImage'
import CollegeImg from '@/assets/Collegeimage.svg'




function UserCollegeCards({college,index}) {

//   const {url} = useImage(trip?.userSelection?.location,index);
  
  return (
    <Link to={'/view-colleges/'+college.id}>
    <div className='transition duration-500 hover:scale-105 hover:shadow-lg  rounded-xl p-3'>
        <img src={CollegeImg}
        className='h-[180px] w-full object-cover rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{college?.userSelection?.Location}</h2>
            <h2 className='text-sm text-gray-500'>{college?.userSelection?.Degree} In {college?.userSelection?.Stream}</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserCollegeCards