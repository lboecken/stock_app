import './App.css';
import SignInForm from './Components/SignInForm';
import RegisterForm from './Components/RegisterForm';
import Homepage from './Components/Homepage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="">
      <Router>
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/signin" element={<SignInForm />} />
    <Route path="/register" element={<RegisterForm />} />

    </Routes>


      </Router>


    </div>
  );
}

export default App;
