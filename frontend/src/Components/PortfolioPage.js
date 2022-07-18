import React from 'react'
import "../Components/Dashboard/Dashboard.css"
import DashboardNavBar from './Dashboard/DashboardNavbar';
import axios from "axios";
import { useState, useEffect } from 'react';
import useUser from "./useUser";



const PortfolioPage = () => {

  const [totalholdings, setTotalHoldings] = useState(0)
  const { signedInUser } = useUser();
  const [userId, setUserId] = useState("")

  useEffect(() => {
    getUser();
    
  }, [])
  useEffect(() => {
    getTotalHoldings();
    
  }, [userId])

  async function getUser() {
    await axios.get("api/users/" + signedInUser).then((res) => {
      console.log(res.data);
      // console.log(res.data[0].id)
      setUserId(res.data[0].id)
    });
  }



  async function getTotalHoldings() {
    await axios.get("api/totalholdings/" + userId).then((res) => {
      console.log(res.data)
      setTotalHoldings(res.data)
      
    })
  }


  return (

    <div className='body-font'>
    
    <DashboardNavBar />

    <div>Portfolio Page</div>
    
    <div>Total Holdings:{totalholdings}</div>
    
    
    
    </div>


  )
}

export default PortfolioPage