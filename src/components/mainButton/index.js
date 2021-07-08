import React from "react";
import "./index.css";
const MainButton = (props) => {
  const { label = "", onClick = () => {} } = props;
  return (
    <>
        <div className='proceed_btn_div'>
            <div className='proceed-btn' onClick={() => onClick()}>
              <p className='proceed_text'>{label}</p>
            </div>
          </div>
    </>
  );
};
export default MainButton;
