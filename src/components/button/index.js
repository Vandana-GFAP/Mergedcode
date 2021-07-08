import React from 'react';
import './index.css'
const CustomButtom = props => {
  const { label = '', onClick = () => {} } = props;
  return (
    <>
      <div className="button_block"
        onClick={() => onClick()}
      >
        <p className="button-label">{label}</p>
      </div>
    </>
  );
};

export default CustomButtom;
