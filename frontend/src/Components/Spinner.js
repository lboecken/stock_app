import React from "react";
import spinner from "../Images/spinner.gif";

const Spinner = () => {
  return (
    <img
      src={spinner}
      style={{ width: "50px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  );
};

export default Spinner;
