import React, { useState } from 'react';
import './index.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import TransactionSection from './transactionSection';
import CategorySection from './categorySection';
import MerchantSection from './merchantSection';

import { Dropdown, SplitButton } from 'react-bootstrap';
import { withRouter } from 'react-router';
const Transaction = () => {
  const [activeTab, setActiveTab] = useState('TransactionSection');

  const [valType, setValType] = useState('');
  const changehandler = e => setValType(e.target.value);
  console.log(valType);
  return (
    <>
      <div
      // style={{
      //   // height: window.innerHeight,
      //   height: '92vh',
      // }}
      >
        <div className='transaction_body'>
          <div className='transaction_section'>
            <div className='d-flex justify-content-around align-items-center py-4'>
              <div
                className='btn_transact'
                style={{
                  backgroundColor:
                    activeTab === 'TransactionSection' ? '#29529F' : 'white',
                  color:
                    activeTab === 'TransactionSection' ? 'white' : '#29529F',
                }}
                onClick={() => setActiveTab('TransactionSection')}
              >
                Transactions
              </div>
              <div
                className='btn_transact'
                style={{
                  backgroundColor:
                    activeTab === 'CategorySection' ? '#29529F' : 'white',
                  color: activeTab === 'CategorySection' ? 'white' : '#29529F',
                }}
                onClick={() => setActiveTab('CategorySection')}
              >
                Category
              </div>
              <div
                className='btn_transact'
                style={{
                  backgroundColor:
                    activeTab === 'MerchantSection' ? '#29529F' : 'white',
                  color: activeTab === 'MerchantSection' ? 'white' : '#29529F',
                }}
                onClick={() => setActiveTab('MerchantSection')}
              >
                Merchant
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center px-3 py-2'>
              <IoIosArrowBack />
              <div className='d-block align-items-center align-center'>
                <div>
                  {['down'].map(direction => (
                    <SplitButton
                      key={direction}
                      id={`dropdown-button-drop-${direction}`}
                      drop={direction}
                      variant='secondary'
                      title={valType}
                      onChange={changehandler}
                    >
                      <Dropdown.Item eventKey='Week'>Week</Dropdown.Item>
                      <Dropdown.Item eventKey='Month'>Month</Dropdown.Item>
                    </SplitButton>
                  ))}
                </div>
                <p>08/01 - Today</p>
              </div>
              <IoIosArrowForward />
            </div>
            {activeTab === 'TransactionSection' && <TransactionSection />}
            {activeTab === 'CategorySection' && <CategorySection />}
            {activeTab === 'MerchantSection' && <MerchantSection />}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Transaction);
