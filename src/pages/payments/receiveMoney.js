import React from "react";
import "./style.css";
import RecentActivity from "../../components/recentActivity";
import {withRouter} from 'react-router-dom';
import { getLanguageText } from "../../language";
import { useSelector } from "react-redux";
const ReceiveMoney = (props) => {
  const { history = {} } = props || {};
  const UserData = useSelector((state) => state.UserData) || {};
  const { language } = UserData || {};
  const inputBox = [
    {
      heading: getLanguageText({ language, key: "receiveVirtualAccount" }),
      subheading: getLanguageText({ language, key: "receiveVirtualMoney" }),
      onClick:()=>{
        history.push('requestVAccount')
      },
    },
    {
      heading:getLanguageText({ language, key: "receiveUPIId" }),
      subheading: getLanguageText({ language, key: "receiveMoneyUPI" }),
      onClick:()=>{
        history.push('requestUPI'); 
      },
    },
  ];
  const PaymentBox = ({ item, index }) => {
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
        {inputBox?.map((item, index) => (<PaymentBox key={index} item={item}/>))}
      </div>
      <RecentActivity />
    </>
  );
};
export default withRouter(ReceiveMoney);
