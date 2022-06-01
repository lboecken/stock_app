import './App.css';
import SignInForm from './Components/SignInForm';
import RegisterForm from './Components/RegisterForm';
import Homepage from './Components/Homepage';
import Dashboard from './Components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TradePage from './Components/TradePage';
import PortfolioPage from './Components/PortfolioPage';


function App() {
  return (
    <div className="">
      <Router>
      <>
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/signin" element={<SignInForm />} />
    <Route path="/register" element={<RegisterForm />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/trade" element={<TradePage />} />
    <Route path="/portfolio" element={<PortfolioPage />} />

    </Routes>

</>
      </Router>


    </div>
  );
}

export default App;
