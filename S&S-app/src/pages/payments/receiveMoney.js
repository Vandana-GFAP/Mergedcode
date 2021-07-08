import React from "react";
import "./style.css";
import RecentActivity from "../../components/recentActivity";
import {withRouter} from 'react-router-dom'
const ReceiveMoney = (props) => {
  const { history = {} } = props || {};
  const inputBox = [
    {
      heading: "Request money via Virtual Account",
      subheading: "Request money from virtual account.",
      onClick:()=>{
        history.push('requestVAccount')
      },
    },
    {
      heading: "Request money via UPI ID",
      subheading: "Request money from UPI ID.",
      onClick:()=>{
        history.push('requestUPI')
      },
    },
  ];
  const paymentBox = ({ item, index }) => {
    const { heading, subheading, onClick=()=>{} } = item;
    return (
      <>
        <div
          key={index}
          onClick={()=>onClick()}
          className="box_payment d-flex justify-content-between align-items-center"
        >
          <div className="d-block justify-content-center">
            <p className="_box_head">{heading}</p>
            <p className="_box_subhead">{subheading}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ margin: "25px 0px" }}>
        {inputBox?.map((item, index) => paymentBox({ item, index }))}
      </div>
      <RecentActivity />
    </>
  );
};
export default withRouter(ReceiveMoney);
