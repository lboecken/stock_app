import './App.css';
// import SignInForm from './Components/SignInForm';
// import RegisterForm from './Components/RegisterForm';
// import Homepage from './Components/Homepage';
// import Dashboard from './Components/Dashboard'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import TradePage from './Components/TradePage';
// import PortfolioPage from './Components/PortfolioPage';
import { Outlet } from "react-router-dom";
import useUser from './Components/useUser';


function App() {


  // const useToken = () => {
  //   console.log("useToken")
  // }
  // const useUser = () => {
  //   console.log("useUser")
  // }

  // const {token, setToken, removeToken} = useToken();
  const {signedInUser, setSignedInUser, signOutUser } = useUser(); 


  const CONTEXT = {
  // token: token, 
  // setToken, 
  signedInUser,
  // removeToken,
  signOutUser
  };


  return (
    <>
      <Outlet context={CONTEXT}/>
      {/* <Outlet/> */}
    </>
  );
}

export default App;
