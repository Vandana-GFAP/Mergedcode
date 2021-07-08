import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import ProgressCard from '../../components/progressCard';
import { paymentBanner } from '../../assets/images';
import { withRouter } from 'react-router';

const RequestUPI = () => {
  const [selectedCard, setSelectedCard] = useState({});
  const [cardList, setCardList] = useState([]);
  return (
    <div
      style={{
        // height: window.innerHeight,
        height: '92vh',
      }}
    >
      <div className='set-limit-body'>
        <Carousel
          preventDefaultTouchmoveEvent={true}
          enableMouseSwipe={true}
          enableSwipe={true}
          showArrows={false}
          initialFirstItem={0}
          onChange={({ item, index }) => {
            const { cardDetails = {} } = item || {};
            setSelectedCard(cardDetails);
          }}
        >
          {cardList?.map((item, index) => {
            return <ProgressCard key={index} cardDetails={item} />;
          })}
        </Carousel>
        <div className='setbox'>
          <p className='settitle'>Request Via Virtual Account</p>
          <p className='setsubtitle'>
            Recieve money into card XXXX XXXX XXXX 1234
          </p>
          <div className='paymentImage'>
            <img src={paymentBanner} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RequestUPI);
