import React, { useState } from 'react'
import CollegeImg from '@/assets/Collegeimage.svg'
import { Link } from 'react-router-dom'
// import useImage from '@/hooks/useImage'
import { CiBookmark } from 'react-icons/ci'
import { BsBookmarkCheckFill } from "react-icons/bs";
import { toast } from 'sonner'

function CollegeCard({college}) {

    // const {imageUrl} = useImage(college.college_name)
    // console.log(imageUrl)
    const [saveCollege,setSaveCollege] = useState([]);

    function addBookmark(){
      if(saveCollege.includes(college.id)) {
        //pehle se like hua pada tha
        setSaveCollege( (prev) => prev.filter((cid)=> (cid !== college.id)));
        toast.warning("Save removed");
    }
    else {
        //pehle se like nahi hai ye course
        //insert karna h ye course liked courses me 
        if(saveCollege.length === 0 ) {
            setSaveCollege([college.id]);
        }
        else {
            //non-empty pehle se
            setSaveCollege((prev) => [...prev,college.id]);
        }
        toast.success("Save Successfully");
      }
    }
    
  return (
    <div className='border-2 border-gray-300 w-full rounded-lg transition duration-500 hover:scale-105 hover:shadow-lg'>
        <div className='collegeCard flex flex-wrap w-full h-full'>
        <div className='collegeCardImg lg:w-[35%] h-full'>
      <Link to={college.website} target='blank'>
        <img src={CollegeImg} loading='lazy' className='w-full h-full rounded-lg object-cover'/>
      </Link>
        </div>
      
        <div className='collegeCardDetails w-[65%] p-5 flex flex-col text-left'>
        <div className='border-b-2 pb-2'>
            <Link to={college.website} target='blank'>
            <h3 className='text-2xl font-semibold hover:text-blue-600'>{college.college_name}</h3>
            </Link>
            <Link to={'https://www.google.com/maps/search/?api=1&query='+college.address} target='blank'>
            <p className='text-sm font-medium hover:text-gray-500'>{college.address}</p>
            </Link>
        </div>

        <div className='mt-3'>
            <p className='mb-1 font-medium relative'><span className='underline text-gray-600'>Fees </span>: {college.fees} <span className='absolute text-lg top-1 right-1' onClick={addBookmark}>
             {
              saveCollege.includes(college.id) ? <BsBookmarkCheckFill/> : <CiBookmark />
             } 
              </span></p> 
            <p className='mb-1 font-medium'><span className='underline text-gray-600'>Admission Criteria </span>: {college.admission_criteria}</p>
            <p className='mb-1 font-medium'><span className='underline text-gray-600'>Placement Record </span>: {college.placement_records}</p>
            <p className='mb-1 font-medium'><span className='underline text-gray-600'>Description </span>: {college.description}</p>
        </div>
        </div>
        </div>
        </div>
  )
}

export default CollegeCard