import React, { useState } from "react";
import { cardBackground, cardChip, rupayIcon } from "../../assets/images";
import MPinModal from "../modal/MPinModal";
import "./index.css";
const Card = (props) => {
  const { cardDetails = {} } = props;

  const {
    cardNumber = "",
    cardHolder = "",
    expiryMonth = "",
    expiryYear = "",
    cvv = "",
    type = "",
    isFreeze = false,
  } = cardDetails;

  const [isCardVisible, setIsCardVisible] = useState(false);
  const [askForMpin, setAskForMpin] = useState(false);

  const cardClicked = () => {
    if (!isFreeze) {
      if (!isCardVisible) setAskForMpin(true);
    }
  };



  return (
    <>
      <MPinModal
        modalToggle={askForMpin}
        setModalToggle={setAskForMpin}
        showCard={setIsCardVisible}
      />

            <div
        className="card-box d-flex justify-content-center align-items-center p-1"
        style={{
          opacity: isFreeze ? 0.7 : 1,
        }}
      >
        <div
          className="main_card_img"
          style={{
            backgroundImage: `url(${cardBackground})`,
            backgroundSize: 'cover'
          }}
          // onClick={() => cardClicked()}
        >
          <img src={cardChip} alt="Chip image" className="chip_img" />
          <p className="card_num_style">
            {isCardVisible
              ? String(cardNumber)
                  ?.replace(/(\d{4})/g, "$1 ")
                  ?.replace(/(^\s+|\s+$)/, "")
              : "XXX XXX XXX " + String(cardNumber)?.substring(12, 16)}
          </p>

          {isCardVisible ? (
            <div className="d-flex justify-content-between flex-row align-items-end card_num">
              <p className="card_holder">{cardHolder}</p>

              <div>
                <p className="expiry">Expiry</p>
                <p className="expiry_date">
                  {expiryMonth}/{String(expiryYear).substring(2, 4)}
                </p>
              </div>

              <div>
                <p className="cvv"
                >
                  CVV
                </p>
                <p className="cvv_num"
                >
                  {cvv}
                </p>
              </div>
            </div>
          ) : (
            <div className="tap_view d-flex justify-content-between flex-row align-items-center"
            >
            <p className="card_holder">{cardHolder}</p>
            {/* <p className="tap_view_detail"
              >
             
                Tap To View Details
              </p> */}
              <p className="rupay_txt"                  
              >
                {/* {type?.toLocaleUpperCase()} */}
                {type &&
                  (type === "rupay" ? (
                    <img src={rupayIcon} alt="Rupay Image" />
                  ) : (
                    type?.toLocaleUpperCase()
                  ))}
              </p>
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default Card;
