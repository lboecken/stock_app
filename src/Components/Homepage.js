import React from 'react'
import "../Components/Homepage.css"
import NavBar from "./Navbar";


const Homepage = () => {
  return (
    <div className='bg-image-homepage'>
    <div className="maincontainer">
    <div className="container-fluid">
      <div className="row no-gutter">
      <NavBar />
        <div>
    
          {/* <div className="login d-flex py-5"> */}
            <div className="container">
              <div className="row">
                <div className="title">
                  <h1 className="display-5 ">Welcome to Trade Penguin!</h1>
                  <br></br>
                  <p className=" align-items-center justify-content-center mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat. Duis aute irure dolor in reprehenderiin voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non
                  </p>
                  <p className=" mb-4">
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat. Duis aute irure dolor in reprehenderiin voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non */}
                  </p>
                </div>
              </div>
            </div>
          </div>
    
        </div>
       
      </div>
    </div>
   </div>
  )
}

export default Homepage