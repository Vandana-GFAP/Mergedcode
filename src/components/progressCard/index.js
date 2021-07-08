import React from 'react';
import './index.css';
import { cardBackground, cardChip, rupayIcon } from '../../assets/images';
const ProgressCard = props => {
  const { cardDetails = {} } = props;
  function changeLabel(){
    
  }
  const {
    cardNumber = '',
    type = '',
    cardBalance,
    maxLimit,
    utilizedLimit,
  } = cardDetails;

  return (
    <>
      <div
        className='card-box d-flex justify-content-center align-items-center p-1'
        style={{
          opacity: 1,
        }}
      >
        <div
          className='main_card_img'
          style={{
            backgroundImage: `url(${cardBackground})`,
            backgroundSize: 'cover',
          }}
        >
          <div className='d-flex justify-content-between align-items-center text-white'>
            <img src={cardChip} className='chip_img' alt="Card Chip Image"  />
            <div>
              <div className='d-flex justify-content-between align-items-center card-balance_text'>
                <p>Card Balance</p>
                <p>
                  <span className='card-balance_amt'>₹</span>
                  {' ' + cardBalance}
                </p>
              </div>
              <div className='slide-container'>
                <input
                  type='range'
                  min='1'
                  max={maxLimit}
                  value={utilizedLimit}
                  onChange={changeLabel}
                  className='slider_01'
                  id='myRange'
                  style={{
                    background: `linear-gradient(90deg, #2694e3 ${
                      (utilizedLimit / maxLimit) * 100
                    }%, #fff 0% )`,
                  }}
                />
              </div>
              <p className='utilized_limit'>
                Utilized Limit: ₹ {utilizedLimit} / ₹ {maxLimit}{' '}
              </p>
            </div>
          </div>
          <p className='card_num_style'>
            {'XXX XXX XXX ' + String(cardNumber)?.substring(12, 16)}
          </p>

          <div className='tap_view d-flex '>
            <p className='rupay_txt ml-auto'>
              {/* {type?.toLocaleUpperCase()} */}
              {type &&
                (type === 'rupay' ? (
                  <img src={rupayIcon} />
                ) : (
                  type?.toLocaleUpperCase()
                ))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressCard;
