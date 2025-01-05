import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from './FireBase';
import { toast } from 'sonner';
import CollegeResults from './CollegeResults';


function View_colleges() {

  const {collegeID} = useParams();
  const [collegeData,setCollegeData] = useState([]);

  useEffect(()=>{
    collegeID && GetTripData()
},[collegeID])


  const GetTripData = async () => {
    const docRef = doc(db,'CollegeData',collegeID);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
        setCollegeData(docSnap.data())
    }
    else{
        console.log("No Such Document")
        toast.error('NO Colleges Found!')
    }
    
}
  return (

    <div className='w-full h-full bg-blue-50 text-center'>
      <div>
      <h1 className='text-4xl font-extrabold  pt-16'>Choose The Right College For You</h1>
      <p className='text-xl font-medium text-gray-500 text-center mt-3'>"Discover Your Path to Success By Choosing Right College!"</p>
      </div>

      <CollegeResults collegeData={collegeData}/>
  
    </div>
  
  )
}

export default View_colleges