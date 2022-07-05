import React, { useEffect, useState } from "react";
import "../Dashboard/DashboardNavbar";
import "../Dashboard/Dashboard.css";
import DashboardNavBar from "./DashboardNavbar";
import HoldingsTable from "./HoldingsTable";
import axios from "axios";
import useUser from '../useUser';
import io from "socket.io-client";


const Dashboard = () => {


  const [users, setUsers] = useState([]);
  const { signedInUser, signOutUser } = useUser();
  // const socket = io.connect();

  console.log(signedInUser)

// useEffect(() => {

// }, [signedInUser])

  // useEffect(() => {
  //   let newSocket = io.connect();
  //   newSocket.on("activateUser", (username) => {
  //     console.log(username)
  //   }) 

  // })




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
        <div className="align-items-start">Dashboard</div>
        <div className="welcome-title">Welcome {signedInUser}!</div>
        <div className="row mt-auto mb-5">
          <div className="">
            <HoldingsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
