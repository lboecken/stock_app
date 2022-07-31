import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  BrowserRouter,
  Routes,
  Route,
  useOutlet,
  useOutletContext,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignInForm from "./Components/SignInForm/SignInForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import Homepage from "./Components/Homepage/Homepage";
import Dashboard from "./Components/Dashboard/Dashboard";
import TradePage from "./Components/TradePage/TradePage";
import PortfolioPage from "./Components/PortfolioPage";
import "bootstrap/dist/css/bootstrap.min.css";
import useHoldings from "./hooks/useHoldings";

const root = ReactDOM.createRoot(document.getElementById("root"));

const PublicRoute = ({ restricted, element }) => {
  const { token } = useOutletContext();
  if (token && restricted) {
    console.log("Token and restricted)");
    return <Navigate to="./dashboard" replace={true} />;
  } else {
    return element;
  }
};
const PrivateRoute = ({ element }) => {
  const { token } = useOutletContext();
  if (token) {
    return element;
  } else {
    console.log("No Token");
  }
  return <Navigate to="../" replace={true} />;
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <Routes>
          <Route element={<App />}>
            <Route
              path="/"
              element={<PublicRoute restricted element={<Homepage />} />}
            />
            <Route
              path="/"
              element={<PublicRoute restricted element={<SignInForm />} />}
            />
            <Route
              path="/"
              element={<PublicRoute restricted element={<RegisterForm />} />}
            />
            <Route element={<PrivateRoute element={<DefaultLayout />} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trade" element={<TradePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
            </Route>
          </Route>
        </Routes>
      </>
    </BrowserRouter>

    {/* <App /> */}
  </React.StrictMode>
);
function DefaultLayout() {

  const { token, signedInUser } = useOutletContext();

  const {totalHoldings,
    setTotalHoldings,
    totalHoldingsValue,
    setTotalHoldingsValue,
    updateHoldings} = useHoldings(signedInUser);

  const context = {holdings: {
    totalHoldings,
    setTotalHoldings,
    totalHoldingsValue,
    setTotalHoldingsValue,
    updateHoldings, 
  }} 
 
  return <Outlet context={context}/>;
}