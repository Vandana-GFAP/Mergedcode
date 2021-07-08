import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { recentData } from '../../dummyData/index';
import './index.css';
import { useSelector } from 'react-redux';
import Loader from "../../components/loader";

import { getLanguageText } from '../../language';
//  ###Error modal import
import ErrorModal from '../../components/modal/ErrorModal';

function MerchantSection(props) {
    const [loading, setLoading] = useState(false);

    const { firstDate, lastDate, displayType } = props || {};

    const NUMBER_OF_CATEGORY_TO_DISPLAY = 4;

    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};

    const [graphData, setGraphData] = useState([]);
    const [errorCard, setErrorCard] = useState(false);
    const [activityList, setActivityList] = useState([]);
    const [numberOfDataToShow, setNumberOfDataToShow] = useState(10);
    const [displayedActivityList, setDisplayedActivityList] = useState([]);

    useEffect(() => {
        const list = activityList?.slice(0, numberOfDataToShow);
        setDisplayedActivityList(list);
    }, [activityList, numberOfDataToShow]);

    const sort_by_key = (array, key = 'date') => {
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
            data?.map(item => (total += item?.amount));

            let finalArray = [];

            for (let i = 0; ; i++) {
                let mer = data?.[0]?.merchant;

                let arr = data?.filter(item => item?.merchant === mer);

                data = data?.filter(item => !arr?.includes(item));

                let sum = 0;
                arr?.map(item => (sum += item?.amount));

                finalArray?.push({
                    merchant: mer,
                    amount: sum,
                    percentage: (sum / total) * 100,
                    numberOfTransaction: arr?.length,
                    image: arr?.[0]?.merchant_image,
                });

                if (data.length <= 0) break;
            }

            sort_by_key(finalArray, 'amount');
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
                        merchant: 'Others',
                        image: '',
                        numberOfTransaction: totalNumberOfTransaction,
                        percentage: totalPercentage,
                    });

                    break;
                }

                arrayForGraph.push(finalArray[0]);

                finalArray = finalArray?.filter(
                    item => !arrayForGraph?.includes(item)
                );
            }

            setGraphData(
                arrayForGraph?.filter(
                    item => item && item?.merchant && item?.amount
                )
            );
        } catch (err) {
            {
                setLoading(false);
                setErrorCard(true);
            console.log(
                '<<< Error in loading Graph Data under merchant >>>',
                err
            );
                /* ###Error modal state true*/
            }
            
        }
    }, []);

    // function donoughnut
    function DoughnutChart() {
        const options = {
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function (tooltipItem, data) {
                        return (
                            'Amount: ₹' +
                            data['datasets'][0]['amount'][tooltipItem['index']]
                        );
                    },
                },
                backgroundColor: 'rgba(255,255,255,0.7)',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                bodyFontSize: 12,
                displayColors: false,
                borderRadius: 8,
                borderColor: 'rgba(0,0,0,0.6)',
                boderStyle: 'solid',
                borderWidth: 1,
            },
            legend: {
                display: true,
                position: 'right',
            },
            plugins: {
                datalabels: {
                    formatter: function (value, context) {
                        return Math.round(value) + '%';
                    },
                    color: '#fff',
                },
            },
        };
        return (
            <div className='segment_category_body'>
                <Doughnut
                    data={{
                        labels: graphData?.map(item => item?.merchant),
                        datasets: [
                            {
                                backgroundColor: [
                                    '#26495c',
                                    '#c4a35a',
                                    '#c66b3d',
                                    '#1868ae',
                                    '#81b7d2',
                                ],
                                data: graphData?.map(item => item?.percentage),
                                amount: graphData?.map(item => item?.amount),
                            },
                        ],
                    }}
                    options={options}
                />
            </div>
        );
    }

    // all transaction function
    const renderActivity = ({ item, index }) => {
        const { image, merchant, numberOfTransaction, amount } = item;
        const sign = Math.sign(amount);

        return (
            <div key={index} className='segment_category_div'>
                <div className='segment_div'>
                    <div className='d-inline-flex align-items-center'>
                        <img
                            className='segment_activity_img'
                            src={image}
                            alt='Banner Image'
                            height={40}
                            width={40}
                        />
                        <div className='pl-2 d-block align-items-center'>
                            <p className='segment_title'>{merchant}</p>
                        </div>
                    </div>
                    <div>
                        <p
                            className='segment_amount'
                            style={{
                                color: sign === -1 ? '#6d7274' : '#4BBB56',
                            }}
                        >
                            ₹{amount}
                        </p>
                        <p className='segment_category'>
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
            {/* ###Error modal  */}
            <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
            <DoughnutChart />
            <div className='all_transaction'>
                <p className='title_all'>
                    {getLanguageText({ language, key: 'allTransaction' })}
                </p>
                <div>
                    <div>
                        {displayedActivityList?.map((item, index, array) => {
                            return renderActivity({ item, index, array });
                        })}
                    </div>
                </div>
                <div className='segment_activity_listing'>
                    {numberOfDataToShow < activityList?.length ? (
                        <p
                            className='see_all_p'
                            onClick={() =>
                                setNumberOfDataToShow(numberOfDataToShow + 10)
                            }
                        >
                            {getLanguageText({ language, key: 'seeMore' })}
                        </p>
                    ) : (
                        void 0
                    )}
                </div>
            </div>
        </>
    );
}
export default MerchantSection;
