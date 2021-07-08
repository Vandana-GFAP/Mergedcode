import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { recentData } from "../../dummyData/index";
function MerchantSection() {
  function DoughnutChart() {
    const options = {
      legend: {
        display: false,
      },
      plugins: {
        datalabels: {
          formatter: function (value, context) {
            return Math.round(value) + "%";
          },
          color: "#fff",
        },
      },
    };
    return (
      <div
        style={{
          background:
            "linear-gradient(179.52deg, #F6F9FD -10%, #F6F9FD -9.98%, #F4F6F9 52.82%, #D1DFFB 200.05%)",
          boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
          display: "flex",
        }}
      >
        <Doughnut
          data={{
            labels: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Today"],
            datasets: [
              {
                backgroundColor: [
                  "#0A2A96",
                  "#1A3CB0",
                  "#385EE4",
                  "#557BFF",
                  "#849FFC",
                  "#557BFF",
                  "#849FFC",
                ],
                data: [5, 6, 7, 9, 8, 7, 9],
              },
            ],
          }}
          options={options}
        />
        {/* <nav>
          <ul style={{ listStyle: "none" }}>
            <li
              style={{
                fontWeight: "500",
                fontSize: "12px",
                color: "#849FFC",
              }}
            >
              Amazon
            </li>
            <li>Axis</li>
            <li>Bajaj</li>
            <li>Others</li>
            <li>Amazon</li>
          </ul>
        </nav> */}
      </div>
    );
  }
  const [activityList, setActivityList] = useState([]);
  useEffect(() => {
    //TODO: API call to get activity list
    try{

    }
    catch(err){
      console.log('<<< Error in fetching activity >>>\n',err);
    }

    setActivityList(recentData);
  }, []);
  const renderActivity = ({ item, index, array }) => {
    const { categoryimg, categorytitle, totaltransaction,date, categoryamt } = item;
    const amount = Math.abs(categoryamt);

    return (
      <div key={index} className="category_section">
        <div
          className="optional_c"
          style={{
            borderRadius:
              index === 0
                ? "1.3rem 1.3rem 0 0"
                : index + 1 === array?.length
                ? "0 0 1.3rem 1.3rem"
                : "0 0 0 0",
          }}
        >
          <div className="d-inline-flex align-items-center">
            <img className="img_category" src={categoryimg} />
            <div className="pl-2 d-block align-items-center">
              <p className="category_title">{categorytitle}</p>
              <p className="category_subtitle">Total Transaction {totaltransaction}</p>
            </div>
          </div>
          <div>
            <p
              className="amt_rupee"
            >
              ₹{amount}
            </p>
            <p style={{fontSize:'12px',color:'#477CC6',fontWeight:'600'}}>{date}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DoughnutChart />
      <div className="all_transaction">
        <p className="title_all">All Transactions</p>
        <div>
          <div className="list-box">
            {activityList?.map((item, index, array) => {
              return renderActivity({ item, index, array });
            })}
          </div>
        </div>
        <p className="see_all_p">See all</p>
      </div>
    </>
  );
}
export default MerchantSection;
