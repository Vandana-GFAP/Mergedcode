import React from "react";
import { loader } from '../../assets/images';
import "./index.css";
const Loader = () => {
  return (
    <>
      <div className="loader_div">
      <div>
        <img src={loader} className="loader_img" alt="Loading..." />
        <p className="loader_text">Loading, Please Wait...</p>
        </div>
      </div>
    </>
  );
};

export default Loader;
