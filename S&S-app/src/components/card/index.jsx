import React, { useEffect, useState } from "react";
import { cardBackground, cardChip, rupayIcon } from "../../assets/images";
import MPinModal from "../modal/mpin/MPinModal";
import "./index.css";


const Card = ({ cardDetails }) => {
  const {
    cardNumber = "",
    holderName = "",
    expieryDate = "",
    cvv = "234",
    type = "",
    status = "active",
  } = cardDetails;

  const [isCardVisible, setIsCardVisible] = useState(false);
  const [askForMpin, setAskForMpin] = useState(false);
  const [isFreeze, setIsFreeze] = useState(status === "active" ? false : true)

  useEffect(() => {
    setIsFreeze(status === "active" ? false : true);
  }, [status])

  const cardClicked = () => {
    if (!isFreeze) {
      if (!isCardVisible) setAskForMpin(true);
    }
  };

  return (
    <>
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
        // onClick={() => cardClicked()}    //Uncomment this to view details
        >
          <img src={cardChip} className="chip_img" />
          <p className="card_num_style">
            {isCardVisible
              ? String(cardNumber)
                ?.replace(/(\d{4})/g, "$1 ")
                ?.replace(/(^\s+|\s+$)/, "")
              : "XXX XXX XXX " + String(cardNumber)?.substring(12, 16)}
          </p>

          {isCardVisible ? (
            <div className="d-flex justify-content-between flex-row align-items-end card_num">
              <p className="card_holder">{holderName}</p>

              <div>
                <p className="expiry">Expiry</p>
                <p className="expiry_date">
                  {/* {expiryMonth}/{String(expiryYear).substring(2, 4)} */}
                  {expieryDate}
                </p>
              </div>

              {/*  //Uncomment this to view details
              <div>
                <p className="cvv"
                >
                  CVV
                </p>
                <p className="cvv_num"
                >
                  {cvv}
                </p>
              </div> */}
            </div>
          ) : (
            <div className="tap_view d-flex justify-content-between flex-row align-items-center">
              {/*  //Uncomment this to view details
              <p className="tap_view_detail">
                Tap To View Details
              </p> */}
              <p className="rupay_txt">
                {/* {type?.toLocaleUpperCase()} */}
                {type &&
                  (type === "rupay" ? (
                    <img src={rupayIcon} />
                  ) : (
                    type?.toLocaleUpperCase()
                  ))}
              </p>
            </div>
          )}
        </div>
      </div>
      {
        askForMpin &&
        <MPinModal
          modalToggle={askForMpin}
          setModalToggle={setAskForMpin}
          showCard={setIsCardVisible}
        />
      }
    </>
  );
};

export default Card;
