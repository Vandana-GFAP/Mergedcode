import React, { useState } from 'react';
import './style.css';
import { paymentBanner } from '../../assets/images';
import ReceiveMoney from './receiveMoney';
import SendMoney from './sendMoney';
import { withRouter } from 'react-router';

const Payments = props => {
  const [activeTab, setActiveTab] = useState('Sendmoney');

  return (
    <>
      <div
      // style={{
      //   // height: window.innerHeight
      //   height: '92vh',
      // }}
      >
        <div className='payment_body'>
          <div className='payment_section'>
            <div className='d-flex justify-content-around py-3'>
              <div
                className='btn_color'
                style={{
                  backgroundColor:
                    activeTab === 'Sendmoney' ? '#29529F' : 'white',
                  color: activeTab === 'Sendmoney' ? 'white' : '#29529F',
                }}
                onClick={() => setActiveTab('Sendmoney')}
              >
                Send
              </div>
              <div
                className='btn_color'
                style={{
                  backgroundColor:
                    activeTab === 'Receivemoney' ? '#29529F' : 'white',
                  color: activeTab === 'Receivemoney' ? 'white' : '#29529F',
                }}
                onClick={() => setActiveTab('Receivemoney')}
              >
                Receive
              </div>
            </div>
            <div className='paymentImage'>
              <img src={paymentBanner} />
            </div>
            {activeTab === 'Sendmoney' && <SendMoney />}
            {activeTab === 'Receivemoney' && <ReceiveMoney />}
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(Payments);
