import React from 'react'
import "../Components/RegisterForm.css"
import logo from '../Images/penguin-logo.png';

const RegisterForm = () => {
  return (
    <div className='bg-image-register'>
    
    <img src={logo} className="penguin-logo" alt="logo" />
        <p>
          Trade Penguin Register Page
        </p>
    
    
    </div>
  )
}

export default RegisterForm