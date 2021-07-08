import React, { useState } from "react";
import "./style.css";
import { paymentBanner } from "../../assets/images";
import ReceiveMoney from "./receiveMoney";
import SendMoney from "./sendMoney";
import ErrorModal from "../../components/modal/ErrorModal";
import { getLanguageText } from "../../language";
import { useSelector } from "react-redux";

const Payments = () => {
  const [activeTab, setActiveTab] = useState("Sendmoney");
  const [errorCard, setErrorCard] = useState(false);
  const UserData = useSelector((state) => state.UserData) || {};
  const { language } = UserData || {};

  return (
    <>
      <div>
        <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
        <div className="payment_body">
          <div className="payment_section">
            <div
              className="py-3"
              style={{display:'grid',gridTemplateColumns:'1fr 1fr',columnGap:'5px',margin: "0 20px" }}
            >
              <div
                className="btn_colors"
                style={{
                  backgroundColor:
                    activeTab === "Sendmoney" ? "#29529F" : "white",
                  color: activeTab === "Sendmoney" ? "white" : "#29529F",
                  flex: "auto",
                  
                }}
                onClick={() => setActiveTab("Sendmoney")}
              >
                {getLanguageText({ language, key: "send" })}
              </div>
              <div
                className="btn_colors"
                style={{
                  backgroundColor:
                    activeTab === "Receivemoney" ? "#29529F" : "white",
                  color: activeTab === "Receivemoney" ? "white" : "#29529F",
                  flex: "auto",
                  
                }}
                onClick={() => setActiveTab("Receivemoney")}
              >
                {getLanguageText({ language, key: "request" })}
              </div>
            </div>
            <div className="paymentImage">
              <img src={paymentBanner} alt="Payment Banner Icon" />
            </div>
            {activeTab === "Sendmoney" && <SendMoney />}
            {activeTab === "Receivemoney" && <ReceiveMoney />}
          </div>
        </div>
      </div>
    </>
  );
};
export default Payments;
