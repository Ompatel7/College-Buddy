import { useState,useEffect } from "react";
import axios from "axios";


const useImage = (name)=>{

    const url = `https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_image_Search_api}&cx=01eb4d3dd893b430c&q=${name}&searchType=image`
    const [imageUrl,setUrl] = useState([]);
    const [loader,setLoader] = useState(false)

    const getPhotos = async()=>{
        setLoader(true);
        try{
            const {data} = await axios.get(url);
            setUrl(data?.items[0]?.link)
        }
        catch(error){
            console.log('Error Fatching image'+error);
        }
        setLoader(false)
    }

    useEffect(()=>{
        getPhotos();
    },[]);

    return{imageUrl,loader};
    
}

export default useImage;
