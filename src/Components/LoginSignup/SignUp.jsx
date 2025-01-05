import React, { useState } from 'react'
import loginImg from '@/assets/LoginIcon.jpg'
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../FireBase';


function SignUp() { 
  
  const [signupData,setSignupData] = useState([]);
  const [Password,setPassword] = useState(false)
  const [confirmPassword,setConfirmPassword] = useState(false)
  const navigate = useNavigate();
  
  function handelData(name,value){
    setSignupData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const submitSignUp =(e)=>{
    e.preventDefault();

    if(!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword){
      toast.error('Please fill all the Details')
      return ;
    }

    if(signupData.password === signupData.confirmPassword){
      localStorage.setItem('user',JSON.stringify(signupData));
      SaveLoginData()
      toast.success(`Registered successfully! \n Welcome ${signupData.name}`)
      navigate('/')

      setTimeout(()=>{
        window.location.reload();
      },2000)

    }
    else{
      toast.warning('Please Enter Same Password')
    }
  }

  const SaveLoginData = async()=>{
    //we can get user info from here as well
    const user = JSON.parse(localStorage.getItem('user'));
    try {
    const usersCollection = collection(db, 'users');
    // Add a new document with auto-generated ID
    const docRef = await addDoc(usersCollection, {
       email: signupData.email,
       name: signupData.name,
       password: signupData.password, // Note: In production, use proper authentication
       timestamp: new Date()
    });} 
    catch (error) {
      toast.error('Error registering user: ' + error.message);
    }
  }

  return (
    <div className='signUpPage my-12 mx-5 w-[90%] sm:w-[50%] md:w-[35%] lg:w-[28%] border border-[#d8d8d8] shadow-xl p-10 rounded-3xl'>
      <div className='w-full h-full flex items-center flex-col '>
        <div className='w-[100px] h-[110px]'>
          <img src={loginImg}/>
          <h3 className='text-center text-2xl font-medium'>Sign Up</h3>
        </div>
      
      <form className='w-full mt-12' onSubmit={submitSignUp}>
        <div className='mb-3'>
        <label htmlFor='name' className='text-lg'>Your Name</label>
        <input type='text' name='name' placeholder='Enter Your Name...' className='w-full h-8 mt-1 p-4 border-2 border-black rounded'
        onChange={(e)=>{handelData('name',e.target.value)}}/>
        </div>

        <div className='mb-3'>
        <label htmlFor='email' className='text-lg'>Email Address</label>
        <input type='email' name='email' placeholder='Enter Your Email...' className='w-full h-8 mt-1 p-4 border-2 border-black rounded'
        onChange={(e)=>{handelData('email',e.target.value)}}/>
        </div>

        <div className='mb-3 relative'>
        <label htmlFor='password' className='text-lg'>Password</label>
        <input type={Password ? 'text' : 'password'} placeholder='Enter Your Password...' className='w-full h-8 mt-1 p-4 border-2 border-black rounded'
        onChange={(e)=>{handelData('password',e.target.value)}}/>
        <span onClick={() => setPassword((prev) => !prev)} className='text-xl absolute bottom-2 right-3'>
        {
          Password ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible/>)  
        } 
        </span> 
        </div>

        <div className='mb-5 relative'>
        <label htmlFor='password' className='text-lg'>Confirm Password</label>
        <input type={confirmPassword ? 'text' : 'password'} placeholder='Enter Your Password...' className='w-full h-8 mt-1 p-4 border-2 border-black rounded'
        onChange={(e)=>{handelData('confirmPassword',e.target.value)}}/>
        <span onClick={() => setConfirmPassword((prev) => !prev)} className='text-xl absolute bottom-2 right-3'>
        {
          confirmPassword ? (<AiOutlineEye/>) : (<AiOutlineEyeInvisible/>)  
        } 
        </span> 
        </div>

        
        <div>
          <button type='submit' className='p-2 w-full rounded-md text-white transition duration-400
       bg-blue-500 hover:bg-blue-600 hover:font-medium'>Sign In</button>
        </div>
         
      </form>
      </div>
    </div>
  )
}

export default SignUp