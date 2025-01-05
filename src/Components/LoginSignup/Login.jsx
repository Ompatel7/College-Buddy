import React, { useState } from 'react'
import loginImg from '@/assets/LoginIcon.jpg'
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../FireBase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Login({setLogin}) {

  const [loginData,setLoginData] = useState([]);
  const [showPassword,setPassword] = useState(false);
  const navigate = useNavigate();

  function changeHandler(name,value){
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const submitLogin = async(event) => {
    event.preventDefault();

    if(!loginData?.email || !loginData?.password){
      toast.error('Please fill the Details')
      return;
    }

    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    //To see all users (for admin purposes), you can use this code:
    // snapshot.forEach(doc => {
    //   console.log('User:', doc.data());
    // });
      
    try {  
    // Create a query to find user with matching email
    const q = query(usersRef, where('email', '==', loginData.email));
    // Execute the query
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      toast.error('No user found with this email');
      return;
    }
    // Check credentials
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    if (userData.password === loginData.password) {
      toast.success('Login successful! Welcome ' + userData.name);
      localStorage.setItem('user',JSON.stringify(userData));
      navigate('/')
      setTimeout(()=>{
        window.location.reload();
      },2000)
    } else {
      toast.warning('Incorrect password');
    }} 
    catch (error) {
      toast.error('Error during login: ' + error.message);
    }
  };

  const GoogleLogin = useGoogleLogin({
    onSuccess:(codeRes)=> GetUserProfile(codeRes),
    onError:(error) => toast.error(error)
  })
  
  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then(async(resp)=>{
      localStorage.setItem('user',JSON.stringify(resp.data))
      const user = JSON.parse(localStorage.getItem('user'));
      try {
          const usersCollection = collection(db, 'users');
          // Add a new document with auto-generated ID
          const docRef = await addDoc(usersCollection, {
             id : user?.id,
             email: user?.email,
             name: user?.name,
             picture: user?.picture, 
             timestamp: new Date()
          });} 
          catch (error) {
            toast.error('Error registering user: ' + error.message);
          }
      toast.success('Login successful! Welcome ' + resp?.data?.name)
      navigate('/')
      setTimeout(()=>{
        window.location.reload();
      },2000)
    })
  }



  return (
    <div className='loginPage my-12 mx-5 w-[90%] sm:w-[50%] md:w-[35%] lg:w-[28%] border border-[#d8d8d8] shadow-xl p-10 rounded-3xl'>
      <div className='w-full h-full flex items-center flex-col'>
        <div className='w-[100px] h-[110px]'>
          <img src={loginImg}/>
          <h3 className='text-center text-2xl font-medium'>Sign In</h3>
        </div>
      
      <form className='w-full mt-12' onSubmit={submitLogin}>
        <div className='mb-3'>
        <label htmlFor='email' className='text-lg'>Email Address</label>
        <input type='email' placeholder='Enter Your Email...' className='w-full h-8 mt-1 p-4 border-2 border-black rounded'
        onChange={(e)=>{changeHandler('email',e.target.value)}}/>
        </div>

        <div className='mb-5 relative'>
        <label htmlFor='password'>Password</label>
        <input type={showPassword ? 'text' : 'password'} placeholder='Enter Your Password...' className='w-full h-8 mt-1 p-4 border-2 border-black rounded'
        onChange={(e)=>{changeHandler('password',e.target.value)}}/>
        <span onClick={() => setPassword((prev) => !prev)} className='text-xl absolute bottom-2 right-3'>
        {
          showPassword ? (<AiOutlineEye/>) : (<AiOutlineEyeInvisible/>)  
        } 
        </span> 
        </div>

        <div className='mb-5'>
          <button type='submit' className='p-2 w-full rounded-md text-white transition duration-400
       bg-blue-500 hover:bg-blue-600 hover:font-medium'>Sign In</button>
        </div>
        <div className='mb-5'>
          <button onClick={GoogleLogin} className='p-2 w-full rounded-md text-white transition duration-400
        bg-blue-500 hover:bg-blue-600 hover:font-medium'><span className='inline-block relative top-0.5'><FcGoogle /> </span> Login With Google  </button>
        </div>
        <div >
          <button onClick={(e)=>{e.preventDefault(),setLogin(false)}} className='p-2 w-full rounded-md text-white transition duration-400
       bg-blue-500 hover:bg-blue-600 hover:font-medium'>Create a new account</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login