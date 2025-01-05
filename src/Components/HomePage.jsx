import React, { useState } from 'react'
import location from '@/assets/Location.svg'
import degree from '@/assets/Degree.svg'
import campus from '@/assets/save-money.png'
import typee from '@/assets/Type.svg'
import distance from '@/assets/distance.png'
import BackgroundImg from '@/assets/BackgroundImage.svg'
import { AI_PROMPT } from './Pages/Constand'
import { chatSession } from './AI_model'
import { toast } from 'sonner'
import { doc, setDoc } from 'firebase/firestore'
import { db } from './FireBase'
import { useNavigate } from 'react-router-dom'
import Spinner from './Pages/Spinner'
import Footer from './Pages/Footer'
 

function HomePage() {

  const navigate = useNavigate();

  const [formData,setFormdata] = useState([])
  const [value,setvalue] = useState(0);
  const [loading,setLoading] = useState(false)  

  const handelInputChange =(name,value)=>{
    setFormdata(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const onGenrateColleges = async (event) =>{
    event.preventDefault();
    setLoading(true)
    const user = localStorage.getItem('user');

    if(!user){
      toast.error('Please Login First!');
      setLoading(false)
      return;
    }

    if(formData?.Range == 0 || !formData?.Degree||!formData?.Stream||!formData?.Location || !formData?.Budget){
      toast.error('Please fill all the Details')
      setLoading(false)
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
    .replace('{Degree}',formData?.Degree)
    .replace('{Stream}',formData?.Stream)
    .replace('{Location}',formData?.Location)
    .replace('{Budget}',formData?.Budget)
    .replace('{Range}',formData?.Range)
    
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async(collegeData)=>{

    setLoading(true)
     const user = JSON.parse( localStorage.getItem('user'));
     const docId = Date.now().toString()
       await setDoc(doc(db, "CollegeData", docId), {
        id:docId,
        userSelection:formData,
        collegeData: JSON.parse(collegeData),
        userEmail:user?.email
       });
    setLoading(false)
    navigate('/view-colleges/'+docId)
  }

  return (
    <div className='bg-blue-50 text-center overflow-hidden'>

      <h1 className='text-4xl font-extrabold  pt-16'>Find The Right College For You</h1>
      <p className='text-xl text-gray-500 text-center mt-5'>Set your prefrence to start exploring</p>
      {
        loading ? (<Spinner/>) : 
        (
      <form className='mform flex flex-col items-center gap-3 sm:w-[60%] md:w-[50%] lg:w-[30%] mx-5 sm:mx-auto mt-6 ' onSubmit={onGenrateColleges}>
          {/* Input boxes */}
      <div className='relative w-full'>
      <div className='absolute left-5 flex items-center m-1'>
        <img src={location} className='w-8 h-8'/>
      </div>
      <input type='text' placeholder='Enter Your Location' onChange={(e)=>{handelInputChange('Location',e.target.value)}}
      className='w-[90%] h-9 border-2 p-5 pl-10 rounded border-gray-300 focus:outline-none focus:border-blue-500'/>
      </div>
      <div className='relative w-full'>
      <div className='absolute left-5 flex items-center m-1'>
        <img src={degree} className='w-8 h-8'/>
      </div>
      <input type='text' placeholder='Enter Your Degree' onChange={(e)=>{handelInputChange('Degree',e.target.value)}}
       className='w-[90%] h-9 border-2 p-5 pl-10 rounded border-gray-300 focus:outline-none focus:border-blue-500'/>
      </div>
      <div className='relative w-full'>
      <div className='absolute left-5 flex items-center m-1'>
        <img src={typee} className='w-8 h-8'/>
      </div>
      <input type='text' placeholder='Enter Your Stream' onChange={(e)=>{handelInputChange('Stream',e.target.value)}}
      className='w-[90%] h-9 border-2 p-5 pl-10 rounded border-gray-300 focus:outline-none focus:border-blue-500'/>
      </div>
      <div className='relative w-full'>
      <div className='absolute left-5 flex items-center m-2'>
        <img src={campus} className='w-7 h-7 text-blue-50'/>
      </div>
      <div className='absolute w-full left-4'>
      <button className={`budBtn w-[25%] h-9 m-1 border-2 rounded bg-blue-100 transition-colors hover:bg-blue-200  font-medium 
      ${formData.Budget === 'Low' ? 'bg-blue-300' : '' }`} 
      onClick={(e)=>{e.preventDefault(),handelInputChange('Budget','Low')}}>💵 Low</button>
      <button className={`budBtn w-[25%] h-9 m-1 border-2 rounded bg-blue-100 transition-colors hover:bg-blue-200  font-medium 
      ${formData.Budget === 'Medium' ? 'bg-blue-300' : '' }`} 
      onClick={(e)=>{e.preventDefault(),handelInputChange('Budget','Medium')}}>💰 Mid</button>
      <button className={`budBtn w-[25%] h-9 m-1 border-2 rounded bg-blue-100 transition-colors hover:bg-blue-200  font-medium 
      ${formData.Budget === 'High' ? 'bg-blue-300' : '' }`} 
      onClick={(e)=>{e.preventDefault(),handelInputChange('Budget','High')}}>💸 High</button>
      </div>
      <input type='text'
      className='w-[90%] h-9 border-2 p-5 pl-10 rounded border-gray-300 focus:outline-none focus:border-blue-500'/>
      </div>
      <div className='relative w-full'>  
      <div className='absolute left-5 flex items-center m-2'>
        <img src={distance} className='w-7 h-7 text-blue-50'/>
      </div>
      <input type='range' min={10} max={30} step={5} onChange={(e)=>{ setvalue(e.target.value) ,handelInputChange('Range',e.target.value)}}
      className='w-[65%] lg:w-[65%] h-11 absolute right-20'/>
      <span className='absolute right-8 top-2'>{value} km</span>
      <input type='text' disabled className='w-[90%] h-9 border-2 p-5 rounded bg-white border-gray-300'/> 
      </div>
      <button type='submit' className='searchBtn p-2 w-[40%] rounded text-white hover:font-medium transition duration-200
       bg-blue-600 hover:bg-blue-700 box-border'>
        College Search</button>
      </form>
        )
      }  
      
      <div className="mt-24">
       <img  className="BackgroundImg h-full w-full scale-[3] sm:scale-[2] md:scale-[1.5] lg:scale-[1]" src={BackgroundImg}/>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage