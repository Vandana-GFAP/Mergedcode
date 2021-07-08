import React, { useEffect, useState } from "react";
import "./index.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import TransactionSection from "./transactionSection";
import CategorySection from "./categorySection";
import MerchantSection from "./merchantSection";
import { withRouter } from "react-router-dom";
import { recentData } from "../../dummyData";
import { useSelector } from "react-redux";
import { getLanguageText } from "../../language";
// ###Error modal import
import ErrorModal from "../../components/modal/ErrorModal";

const Transaction = () => {
  const [activeTab, setActiveTab] = useState("TransactionSection");

  const [displayType, setDisplayType] = useState("Week");

  const [backWeek, setBackWeek] = useState(0);
  const [backMonth, setBackMonth] = useState(0);

  const [firstDate, setFirstDate] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());

  const UserData = useSelector((state) => state.UserData) || {};
  const { language } = UserData || {};
  // ###Error modal state
  const [errorCard, setErrorCard] = useState(false);
  // ###Loader state

  useEffect(() => {
    if (displayType === "Week") {
      setFirstDate(startOfWeek(new Date()));

      setLastDate(endOfWeek(new Date()));
    } else if (displayType === "Month") {
      setFirstDate(startOfMonth(new Date()));

      setLastDate(endOfMonth(new Date()));
    }
  }, [displayType]);

  const startOfWeek = (date) => {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const endOfWeek = (date) => {
    let lastday =
      date.getDate() - (date.getDay() - 1) + (date.getDay() === 0 ? -1 : 6);
    return new Date(date.setDate(lastday));
  };

  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const endOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  const changeWeek = (temp) => {
    let first = startOfWeek(
      new Date(new Date().setDate(new Date().getDate() + temp))
    );
    let last = endOfWeek(
      new Date(new Date().setDate(new Date().getDate() + temp))
    );
    setFirstDate(first);
    setLastDate(last);
  };

  const changeMonth = (temp) => {
    let first = startOfMonth(
      new Date(new Date().setDate(new Date().getDate() + temp))
    );
    let last = endOfMonth(
      new Date(new Date().setDate(new Date().getDate() + temp))
    );
    setFirstDate(first);
    setLastDate(last);
  };

  // function to return date wise transaction amount sum
  const dateWiseTransactionSum = ({ date: filterDate, data }) => {
    const arr = data?.filter((item) => {
      const { date } = item || {};
      const newDate = new Date(date);
      return newDate?.toDateString() === filterDate?.toDateString();
    });

    let sum = 0;

    for (let i = 0; i < arr?.length - 1; i++) {
      sum += arr[i]?.categoryamt;
    }

    return sum;
  };

  useEffect(() => {
    getData();
  }, []);

  // call this function to get data according to first & last date
  function getData() {
    try {
      //TODO: API call to get data

      const transactionData = recentData;

      let arr = [];

      for (let d = firstDate; d <= lastDate; d.setDate(d.getDate() + 1)) {
        arr.push(
          dateWiseTransactionSum({
            date: new Date(d),
            data: transactionData,
          })
        );
      }
    } catch (e) {
      // ###Error modal state true
      setErrorCard(true);
      console.log("<<< Error in loading Active Tab >>>", e);
    }
  }

  return (
    <>
      <div>
        {/* ###Error modal state */}
        <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
        <div className="transaction_body">
          <div className="transaction_section">
            {/* these are buttons section for toggling between transaction , merchant,category */}
            <div
              className="d-flex flex-auto justify-content-around align-items-center text-center py-4"
              style={{ margin: "0 2px" }}
            >
              <div
                className="btn_transact"
                style={{
                  backgroundColor:
                    activeTab === "TransactionSection" ? "#29529F" : "white",
                  color:
                    activeTab === "TransactionSection" ? "white" : "#29529F",
                  flex: "auto",
                  margin: "2px",
                }}
                onClick={() => setActiveTab("TransactionSection")}
              >
                {getLanguageText({
                  language,
                  key: "transaction",
                })}
              </div>

              <div
                className="btn_transact "
                style={{
                  backgroundColor:
                    activeTab === "CategorySection" ? "#29529F" : "white",
                  color: activeTab === "CategorySection" ? "white" : "#29529F",
                  flex: "auto",
                  margin: "2px",
                }}
                onClick={() => setActiveTab("CategorySection")}
              >
                {getLanguageText({ language, key: "category" })}
              </div>

              <div
                className="btn_transact"
                style={{
                  backgroundColor:
                    activeTab === "MerchantSection" ? "#29529F" : "white",
                  color: activeTab === "MerchantSection" ? "white" : "#29529F",
                  flex: "auto",
                  margin: "2px",
                }}
                onClick={() => setActiveTab("MerchantSection")}
              >
                {getLanguageText({ language, key: "merchant" })}
              </div>
            </div>

            {/* this is for changing date using arrows */}
            <div className="d-flex justify-content-between align-items-center px-3 py-2">
              <IoIosArrowBack
                style={{
                  cursor: (() => {
                    if (displayType === "Week") {
                      if (
                        startOfWeek(
                          new Date(
                            new Date().setDate(
                              new Date().getDate() + (backWeek - 6)
                            )
                          )
                        ) < new Date(firstDate?.getFullYear(), 0, 1)
                      )
                        return false;
                      return true;
                    } else if (displayType === "Month") {
                      if (
                        startOfMonth(
                          new Date(
                            new Date().setDate(
                              new Date().getDate() +
                                (backMonth - lastDate.getDate())
                            )
                          )
                        ) < new Date(firstDate?.getFullYear(), 0, 1)
                      )
                        return false;
                      return true;
                    }
                  })()
                    ? "pointer"
                    : "not-allowed",
                }}
                onClick={() => {
                  if (displayType === "Week") {
                    if (
                      startOfWeek(
                        new Date(
                          new Date().setDate(
                            new Date().getDate() + (backWeek - 6)
                          )
                        )
                      ) < new Date(firstDate?.getFullYear(), 0, 1)
                    )
                      return;

                    changeWeek(backWeek - 6);
                    setBackWeek(backWeek - 6);
                  } else if (displayType === "Month") {
                    if (
                      startOfMonth(
                        new Date(
                          new Date().setDate(
                            new Date().getDate() +
                              (backMonth - lastDate.getDate())
                          )
                        )
                      ) < new Date(firstDate?.getFullYear(), 0, 1)
                    )
                      return;

                    changeMonth(backMonth - lastDate.getDate());
                    setBackMonth(backMonth - lastDate.getDate());
                  }
                }}
              />

              <div className="d-block align-items-center align-center">
                <form action="#">
                  <select onChange={(e) => setDisplayType(e.target.value)}>
                    <option value="Week">
                      {" "}
                      {getLanguageText({
                        language,
                        key: "week",
                      })}
                    </option>
                    <option value="Month">
                      {" "}
                      {getLanguageText({
                        language,
                        key: "month",
                      })}
                    </option>
                  </select>
                </form>
                <p>
                  {displayType === "Week"
                    ? firstDate?.getDate() +
                      "/" +
                      (firstDate?.getMonth() + 1) +
                      " - " +
                      lastDate?.getDate() +
                      "/" +
                      (lastDate?.getMonth() + 1)
                    : firstDate?.getDate() +
                      "/" +
                      (firstDate?.getMonth() + 1) +
                      " - " +
                      lastDate?.getDate() +
                      "/" +
                      (lastDate?.getMonth() + 1)}
                </p>
              </div>

              <IoIosArrowForward
                style={{
                  cursor: lastDate >= new Date() ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (lastDate >= new Date()) return;

                  if (displayType === "Week") {
                    changeWeek(backWeek + 6);
                    setBackWeek(backWeek + 6);
                  } else if (displayType === "Month") {
                    changeMonth(backMonth + 30);
                    setBackMonth(backMonth + 30);
                  }
                }}
              />
            </div>

            {activeTab === "TransactionSection" && (
              <TransactionSection
                // area chart data

                displayType={displayType}
                firstDate={firstDate}
                lastDate={lastDate}
              />
            )}
            {activeTab === "CategorySection" && (
              <CategorySection
                // donoughnut chart data for category

                firstDate={firstDate}
                lastDate={lastDate}
                displayType={displayType}
              />
            )}
            {activeTab === "MerchantSection" && (
              <MerchantSection
                // donoughnut chart data for merchant
                firstDate={firstDate}
                lastDate={lastDate}
                displayType={displayType}

                // graphData={graphData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Transaction);
