import React, { useState } from "react";
import "./style.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import RecentActivity from "../../components/recentActivity";
import { BsFillPlusCircleFill } from "react-icons/bs";
const SendMoney = (props) => {
  const [openBlock, setOpenBlock] = useState();
  const clickHandler = () => {
    setOpenBlock((openBlock) => !openBlock);
  };
  const inputBox = [
    {
      heading: "Send Money to Card",
      subheading: "Send money to SNS Card",
    },
    {
      heading: "Send to Account",
      subheading: "Send money to the Bank Account.",
    },
  ];
  const paymentBox = ({ item, index }) => {
    const { heading, subheading } = item;

    return (
      <>
        <div
          key={index}
          onClick={clickHandler}
          className="box_payment d-flex justify-content-between align-items-center"
        >
          <div className="d-block justify-content-center">
            <p className="_box_head">{heading}</p>
            <p className="_box_subhead">{subheading}</p>
          </div>
          <div className="icon_style">
            {openBlock ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
        <div>
          {openBlock ? (
            <div className="toggleBlock">
              <BsFillPlusCircleFill className="add_Icon"/>
              <p className="icon-Text">Add</p>
            </div>
          ) : null}
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
export default SendMoney;
