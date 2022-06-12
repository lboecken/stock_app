import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route, useOutlet, useOutletContext, Navigate, Outlet } from 'react-router-dom';
import SignInForm from './Components/SignInForm/SignInForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import Homepage from './Components/Homepage/Homepage';
import Dashboard from './Components/Dashboard/Dashboard'
import TradePage from './Components/TradePage/TradePage';
import PortfolioPage from './Components/PortfolioPage';
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
      <>
    <Routes>
    <Route element={<App />}>

    {/* <Route path="/" element={<PublicRoute restricted element={<Homepage />}/>} /> */}
    {/* <Route path="/" element={<PublicRoute restricted element={<SignInForm />}/>} /> */}
    {/* <Route path="/" element={<PublicRoute restricted element={<RegisterForm />}/>} /> */}
    <Route path="/" element={<Homepage />} />
    <Route path="/signin" element={<SignInForm />} />
    <Route path="/register" element={<RegisterForm />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/trade" element={<TradePage />} />
    <Route path="/portfolio" element={<PortfolioPage />} />
     {/* <Route path="/" element={<PrivateRoute element={<Dashboard />}/>} /> */}
    {/* <Route path="/" element={<PrivateRoute element={<TradePage/>}/>} /> */}
    {/* <Route path="/" element={<PrivateRoute element={<PortfolioPage />}/>} /> */}

    </Route>
    </Routes>

</>
      </BrowserRouter>

    {/* <App /> */}
  </React.StrictMode>
);

// const PublicRoute = ( { restricted, element }) => {
//   const { token } = useOutletContext();
//   if (token && restricted) {
//     return <Navigate to="./dashboard" replace={true} />;
//   } else {
//     return element ? element : <Outlet />
//   }
//   }
// const PrivateRoute = ({ element }) => {
//   const { token } = useOutletContext();
//   if (token) {
//     return element ? element : <Outlet />;
//   } else {
    
//   } return <Navigate to="../" replace={true} />;
// }