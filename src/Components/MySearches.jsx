import { collection, getDocs, where, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from './FireBase';
import UserCollegeCards from './UserCollegeCards';

function MyTrips() {

    const navigate = useNavigate();
    const [userColleges,setUserColleges] = useState([])

    useEffect(()=>{
        GetUserColleges();
    },[])

    const GetUserColleges=async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate('/')
            return;
        }
        const q = query(collection(db,'CollegeData'),where('userEmail','==',user?.email))
        const querySnapshot = await getDocs(q);
        setUserColleges([]); 
        querySnapshot.forEach((doc) => {
        //  console.log(doc.id, " => ", doc.data());
            setUserColleges(prevVal => [...prevVal,doc.data()])
        })

        // For All Collected trips
        // const querySnapshot = await getDocs(collection(db,'CollegeData'));
        // querySnapshot.forEach((doc)=>{
        //     console.log(doc.id," => ", doc.data())
        //     setUserColleges(prevVal => [...prevVal,doc.data()])
        // })

        
    }
    
  return ( 
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-4 mt-10'>
        <h2 className='font-bold text-3xl'>My Colleges</h2>

        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-0 sm:gap-5 '>
            {userColleges.map((college,index) =>(
                <UserCollegeCards college={college} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default MyTrips