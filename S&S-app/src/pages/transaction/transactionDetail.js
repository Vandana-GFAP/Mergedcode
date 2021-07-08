import React from 'react';
import { withRouter } from 'react-router';
import {
  travelicon,
  rightarrow,
  note,
  uploadIcon,
  shareIcon,
} from '../../assets/images';
import './transactionDetail.css';
const TransactionDetail = () => {
  const optional = [
    {
      heading: 'Transaction ID:',
      messages: 'ABCDEFG123',
    },
    {
      heading: 'Status',
      messages: 'Success',
    },
    {
      heading: 'Date',
      messages: '29 Jan 2020',
    },
    {
      heading: 'Time',
      messages: '1:25PM',
    },
  ];
  const category_box = [
    {
      type: 'category',
      heading: 'Travel',
      imgsrc: travelicon,
    },
    {
      type: 'extra',
      heading: 'Add Notes',
      subheading: 'Add a short note to the transaction',
      imgsrc: note,
    },
    {
      type: 'extra',
      heading: 'Upload Receipt',
      subheading: 'Upload a picture of the bill.',
      imgsrc: uploadIcon,
    },
    {
      type: 'extra',
      heading: 'Share',
      subheading: 'Share the transaction details with someone.',
      imgsrc: shareIcon,
    },
  ];
  const renderoptional = ({ item, index }) => {
    const { heading, messages } = item;
    return (
      <div key={index} className='optional_css'>
        <p className='option_p'>{heading}</p>
        <p className='option_p'>{messages}</p>
      </div>
    );
  };
  const rendercategory = ({ item, index }) => {
    const { heading, imgsrc, subheading } = item;
    return (
      <div key={index} className='optional_css'>
        <div className='d-inline-flex align-items-center'>
          <img src={imgsrc} />
          <div className='pl-2 d-block align-items-center'>
            <p className='option_p'>{heading}</p>
            <p className='option_subheading'>{subheading}</p>
          </div>
        </div>
        <div>
          <img src={rightarrow} />
        </div>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className='detail_body'>
          <img
            src='https://www.fintechfutures.com/files/2018/01/amazon-2.png'
            alt='category_img'
            className='category_img'
          />
          <div className='d-flex justify-content-between category_box'>
            <p className='category_titlee'>Amazon</p>
            <p className='category_amts'>
              ₹<span className='categoryrs'>90</span>.00
            </p>
          </div>
        </div>
        <div className='pb-3'>
          <p className='category_heading'>Transaction Details</p>
          <div>
            {optional?.map((item, index) => {
              return renderoptional({ item, index });
            })}
          </div>
          <p className='category_heading'>Category</p>
          {category_box?.map((item, index) => {
            const { type } = item;
            if (type === 'category') {
              return rendercategory({ item, index });
            }
          })}
          <p className='category_heading'>Extra</p>
          {category_box?.map((item, index) => {
            const { type } = item;
            if (type === 'extra') {
              return rendercategory({ item, index });
            }
          })}
        </div>
      </div>
    </>
  );
};
export default withRouter(TransactionDetail);
