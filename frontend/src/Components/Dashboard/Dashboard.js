import React, { useEffect, useState } from "react";
import "../Dashboard/DashboardNavbar";
import "../Dashboard/Dashboard.css";
import DashboardNavBar from "./DashboardNavbar";
import HoldingsTable from "./HoldingsTable";
import axios from "axios";
import useUser from '../useUser';
import { capitalize } from "../Handlers";
// import io from "socket.io-client";
// import { useOutletContext } from 'react-router-dom';


const Dashboard = () => {


  const [users, setUsers] = useState([]);
  const { signedInUser} = useUser();
  const [userHoldings, setUserHoldings] = useState([]);
  // const socket = io.connect();

  // const {setToken, setSignedInUser} = useOutletContext()

useEffect(() => {
  getHoldingsData()
}, [])

  async function getHoldingsData() {
    await axios.get("api/holdings/" + signedInUser).then((res) => {
      
      setUserHoldings(res.data);

      console.log(res.data);
    });
  }

  
  // console.log(signedInUser)

// useEffect(() => {

// }, [signedInUser])

//   useEffect(() => {
//     let newSocket = io.connect();
//     newSocket.on("activateUser", (username) => {
//       console.log(username)
//     }) 

//   })




  async function getUsers() {
    await axios.get("api/users").then((res) => {
      setUsers(res.data);
      console.log(users)
    });
  }

  return (
    <div className="body-font">
      <DashboardNavBar />
      <div className="container dash-container d-flex flex-column">
        {/* <div className="align-items-start">Dashboard</div> */}
        <div className="welcome-title">Welcome {capitalize(signedInUser)}!</div>
        <div className="row mt-auto mb-5">
          <div className="">
            <HoldingsTable userHoldings={userHoldings}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
