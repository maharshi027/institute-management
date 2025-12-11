import React, { useEffect } from 'react'
import './home.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  useEffect(() =>{
    getHomeDetails();
  },[])
  const getHomeDetails = async () => {
     axios.get(`http://localhost:4000/home`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");  
      });
  }
  return (
    <div className='home'>
    Home
    </div>
  )
}

export default Home
