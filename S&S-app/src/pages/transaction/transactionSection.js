import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { recentData } from "../../dummyData/index";
import "chartjs-plugin-datalabels";

function TransactionSection() {
  const [activityList, setActivityList] = useState([]);
  useEffect(() => {
    //TODO: API call to get activity list

    setActivityList(recentData);
  }, []);
  // line chart function
  function LineChart() {
    // const data=(canvas)=>{
    //   const ctx=canvas.getContext("2d")
    //   const gradient=ctx.createLinearGeadient(0,0,100,100);
    //   gradient.addColorStop(0,'#477CC6');
    //   gradient.addColorStop(0,'#6C93B9');
    //   gradient.addColorStop(0,'#6C93B9');
    // }
    const options = {
      layout: {
        padding: {
          left: 25,
          right: 25,
          top: 20,
          bottom: 0,
        },
      },
      plugins: {
        datalabels: {
          formatter: function (value, context) {
            return "₹" + Math.round(value);
          },
          color: "#1D4772",

          font: {
            weight: 400,
            size: 10,
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Line chart",
      },
      tooltips: {
        display: true,
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        backgroundColor: "#6C93B9",
        color: "#1D4772",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: true,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };
    return (
      <div className="container">
        <Line
          data={{
            labels: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Today"],
            datasets: [
              {
                pointStyle: "circle",
                pointHoverBackgroundColor: "#fff",
                borderColor: "#fff",
                backgroundColor: "#6C93B9",
                pointBorderColor: "#29529F",
                data: [100, 500, 600, 500, 700, 1000, 20],
                pointBackgroundColor: "#fff",
                pointBorderColor: "#5180AD",
                pointBorderWidth: 1,
              },
            ],
          }}
          options={options}
          height={195}
        />
      </div>
    );
  }
  const renderActivity = ({ item, index, array }) => {
    const { categoryimg, categorytitle, categorysubtitle, categoryamt } = item;

    const sign = Math.sign(categoryamt);
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
              <p className="category_subtitle">{categorysubtitle}</p>
            </div>
          </div>
          <div>
            <p
              className="amt_rupee"
              style={{ color: sign === -1 ? "#6d7274" : "#4BBB56" }}
            >
              {sign === -1 ? "-" : "+"}₹{amount}
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <LineChart />
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
export default TransactionSection;
