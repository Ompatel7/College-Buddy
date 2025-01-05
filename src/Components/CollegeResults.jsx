import React from 'react'
import CollegeCard from './CollegeCard'
import FooterResult from './Pages/FooterResult'



function CollegeResults({collegeData}) {

  return (
    <div className='collegeCards w-[80%] mt-5 mx-auto'>
        <div className='flex flex-col items-center gap-7'>
        <div className='self-start text-left'>
        <h3 className='font-medium text-lg'>Location - <span>{collegeData?.userSelection?.Location}</span></h3>
        <h3 className='font-medium text-lg'>Recommendation - <span>{collegeData?.collegeData?.length}</span></h3>
        </div>
        {
            collegeData?.collegeData?.map((college)=>(
                <CollegeCard college={college} key={college.id}/>
            ))
        }       
        </div>
        <FooterResult/>
    </div>
  )
}

export default CollegeResults