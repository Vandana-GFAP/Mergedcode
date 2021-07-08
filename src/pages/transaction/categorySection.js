import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import Loader from "../../components/loader";
import { recentData } from "../../dummyData/index";
import "./index.css";
import { useSelector } from "react-redux";
import { getLanguageText } from "../../language";
//  ###Error modal import
import ErrorModal from "../../components/modal/ErrorModal";

function CategorySection(props) {
  const NUMBER_OF_CATEGORY_TO_DISPLAY = 4;

  const { firstDate, lastDate, displayType } = props || {};
  const UserData = useSelector((state) => state.UserData) || {};
  const { language } = UserData || {};
  const [graphData, setGraphData] = useState([]);

  const [activityList, setActivityList] = useState([]);
  const [numberOfDataToShow, setNumberOfDataToShow] = useState(10);
  const [displayedActivityList, setDisplayedActivityList] = useState([]);
  //  ###Error modal state
  const [errorCard, setErrorCard] = useState(false);
  const [loading, setLoading] = useState(false);

  const sort_by_key = (array, key = "date") => {
    return array.sort(function (b, a) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  useEffect(() => {
    setLoading(true);
    try {
      setLoading(false);
      //TODO: API call to get the data of graph from date { firstDate } to { lastDate }

      let unsortedData = recentData;
      let data = sort_by_key(unsortedData);

      // Calculated the total to get the percentage
      let total = 0;
      data?.map((item) => (total += item?.amount));

      let finalArray = [];

      for (let i = 0; ; i++) {
        let cat = data?.[0]?.category;

        let arr = data?.filter((item) => item?.category === cat);

        data = data?.filter((item) => !arr?.includes(item));

        let sum = 0;
        arr?.map((item) => (sum += item?.amount));

        finalArray?.push({
          category: cat,
          amount: sum,
          percentage: (sum / total) * 100,
          numberOfTransaction: arr?.length,
          image: arr?.[0]?.category_image,
        });

        if (data.length <= 0) break;
      }

      sort_by_key(finalArray, "amount");
      setActivityList(finalArray);

      const arrayForGraph = [];

      for (let i = 0; i <= NUMBER_OF_CATEGORY_TO_DISPLAY; i++) {
        if (i === NUMBER_OF_CATEGORY_TO_DISPLAY) {
          let totalAmount = 0,
            totalNumberOfTransaction = 0,
            totalPercentage = 0;

          finalArray?.forEach(({ amount }, index) => {
            totalAmount += amount;
          });

          finalArray?.forEach(({ numberOfTransaction }, index) => {
            totalNumberOfTransaction += numberOfTransaction;
          });

          finalArray?.forEach(({ percentage }, index) => {
            totalPercentage += percentage;
          });

          arrayForGraph?.push({
            amount: totalAmount,
            category: "Others",
            image: "",
            numberOfTransaction: totalNumberOfTransaction,
            percentage: totalPercentage,
          });

          break;
        }

        arrayForGraph.push(finalArray[0]);

        finalArray = finalArray?.filter(
          (item) => !arrayForGraph?.includes(item)
        );
      }

      setGraphData(
        arrayForGraph?.filter((item) => item && item?.category && item?.amount)
      );
    } catch (err) {
      {
        setLoading(false);
        setErrorCard(true);
      console.log("<<< Error in Loading Category Graph Data >>>", err);
        /* ###Error modal state true*/
      }
      
    }
  }, []);

  useEffect(() => {
    const list = activityList?.slice?.(0, numberOfDataToShow);
    setDisplayedActivityList(list);
  }, [activityList, numberOfDataToShow]);

  // Donoughnut function
  const DoughnutChart = () => {
    const options = {
      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            return data["labels"][tooltipItem[0]["index"]];
          },
          label: function (tooltipItem, data) {
            return (
              "Amount: ₹" + data["datasets"][0]["amount"][tooltipItem["index"]]
            );
          },
        },
        backgroundColor: "rgba(255,255,255,0.7)",
        titleFontSize: 12,
        titleFontColor: "#000",
        bodyFontColor: "#000",
        bodyFontSize: 12,
        displayColors: false,
        borderRadius: 8,
        borderColor: "rgba(0,0,0,0.6)",
        boderStyle: "solid",
        borderWidth: 1,
      },
      legend: {
        display: true,
        position: "right",
      },
      plugins: {
        datalabels: {
          formatter: (value) => {
            return Math.round(value) + "%";
          },
          color: "#fff",
        },
      },
    };
    return (
      <div className="segment_category_body">
        <Doughnut
          data={{
            labels: graphData?.map((item) => item?.category),
            datasets: [
              {
                backgroundColor: [
                  "#26495c",
                  "#c4a35a",
                  "#c66b3d",
                  "#1868ae",
                  "#81b7d2",
                ],
                data: graphData?.map((item) => item?.percentage),
                amount: graphData?.map((item) => item?.amount),
              },
            ],
          }}
          options={options}
        />
      </div>
    );
  };

  // all transaction function
  const renderActivity = ({ item, index, array }) => {
    const { image, category, numberOfTransaction, date, amount } = item;
    const sign = Math.sign(amount);

    return (
      <div key={index} className="segment_category_div">
        <div className="segment_div">
          <div className="d-inline-flex align-items-center">
            <img
              className="segment_activity_img"
              src={image}
              alt="Category Image"
              height={40}
              width={40}
            />
            <div className="pl-2 d-block align-items-center">
              <p className="segment_title">{category}</p>
            </div>
          </div>
          <div>
            <p
              style={{
                color: sign === -1 ? "#6d7274" : "#4BBB56",
              }}
              className="segment_amount"
            >
              ₹{amount}
            </p>
            <p className="segment_category">
              Total Transaction {numberOfTransaction}
            </p>
          </div>
        </div>
      </div>
    );
  };
  if (loading) return <Loader />;

  return (
    <>
      {/* ###Error modal */}
      <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
      <DoughnutChart />
      <div className="all_transaction">
        <p className="title_all">
          {getLanguageText({ language, key: "allTransaction" })}
        </p>
        <div>
          <div>
            {displayedActivityList?.map((item, index, array) => {
              return renderActivity({ item, index, array });
            })}
          </div>
        </div>

        {/* see more section below all transaction  */}
        <div className="segment_activity_listing">
          {numberOfDataToShow < activityList?.length ? (
            <p
              className="see_all_p"
              onClick={() => setNumberOfDataToShow(numberOfDataToShow + 10)}
            >
              {getLanguageText({ language, key: "seeMore" })}
            </p>
          ) : (
            void 0
          )}
        </div>
      </div>
    </>
  );
}

export default CategorySection;
