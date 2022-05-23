import React from 'react'
import '../Components/SignInForm.css';
import logo from '../Images/penguin-logo.png';



const SignInForm = () => {
  return (
    <div className='bg-image-signin'>
    
    <img src={logo} className="penguin-logo" alt="logo" />
        <p>
          Trade Penguin Sign In Form Page
        </p>
    
    </div>
  )
}

export default SignInForm