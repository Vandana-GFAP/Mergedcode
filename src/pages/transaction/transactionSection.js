import React, { useState, useEffect } from 'react';
import { recentData } from '../../dummyData/index';
import 'chartjs-plugin-datalabels';
import { withRouter } from 'react-router-dom';
import './index.css';
import {
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from 'recharts';
import { useSelector } from 'react-redux';
import Loader from "../../components/loader";

import { getLanguageText } from '../../language';
import ErrorModal from '../../components/modal/ErrorModal';

function TransactionSection(props) {
    const [loading, setLoading] = useState(false);

    const { displayType, firstDate, lastDate } = props || {};
    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};
    const [graphData, setGraphData] = useState([]);

    const { history = {} } = props || {};

    const [data, setData] = useState([]);
    const [errorCard, setErrorCard] = useState(false);

    // function to sort the JSON array in respect to date
    const sort_by_key = (array, key = 'date') => {
        return array.sort(function (b, a) {
            var x = a[key];
            var y = b[key];
            return x < y ? -1 : x > y ? 1 : 0;
        });
    };

    useEffect(() => {
        setLoading(true);
        setGraphData([]);

        //TODO: API call to get the graph data from date { firstDate } to { lastDate }
        const unsortedData = recentData;
        const data = sort_by_key(unsortedData);

        setActivityList(data);

        if (displayType === 'Week') {
            try {
                setLoading(false);
                for (let i = 0; i < 7; i++) {
                    let sum = 0;
                    data?.map(item => {
                        const { date, amount } = item || {};

                        const UTC_Date = new Date(
                            date?.split('-')[0],
                            date?.split('-')[1] - 1,
                            date?.split('-')[2]
                        );

                        const day = new Date(UTC_Date).getDay();

                        if (i + 1 === day) {
                            sum += amount;
                        }
                    });
                    graphData.push(sum);
                }
            } catch (err) {
                setLoading(false);
                setErrorCard(true);
                console.log('<<< Error in Loading Graph Data >>>', err);
            }

            setData([
                { x: 'Mon', y: graphData[0] ? graphData[0] : 0 },
                { x: 'Tue', y: graphData[1] ? graphData[1] : 0 },
                { x: 'Wed', y: graphData[2] ? graphData[2] : 0 },
                { x: 'Thr', y: graphData[3] ? graphData[3] : 0 },
                { x: 'Fri', y: graphData[4] ? graphData[4] : 0 },
                { x: 'Sat', y: graphData[5] ? graphData[5] : 0 },
                { x: 'Sun', y: graphData[6] ? graphData[6] : 0 },
            ]);
        } else {
            try {
                setLoading(false);
                const loopEndDate =
                    lastDate > new Date() ? new Date() : lastDate;

                for (let i = 0; i < loopEndDate?.getDate(); i++) {
                    let sum = 0;

                    data?.map(item => {
                        const { date, amount } = item || {};

                        const UTC_Date = new Date(
                            date?.split('-')[0],
                            date?.split('-')[1] - 1,
                            date?.split('-')[2]
                        );

                        const day = new Date(UTC_Date).getDate();

                        if (i + 1 === day) {
                            sum += amount;
                        }
                    });
                    graphData.push(sum);
                }
            } catch (err) {
                setLoading(false);
                setErrorCard(true);
                console.log(
                    '<<< Error in Loading Transaction Graph Data Month Wise >>>',
                    err
                );
            }

            let arr = [];

            const loopEndDate = lastDate > new Date() ? new Date() : lastDate;

            // To create the graph data according to month
            for (let i = 1; i <= loopEndDate?.getDate(); i++) {
                if (
                    graphData?.[i - 1] !== undefined &&
                    graphData?.[i - 1] !== null
                ) {
                    // console.log('<<', i, graphData[i - 1]);
                    arr.push({
                        x: i,
                        y: graphData?.[i - 1] ?? 0,
                    });
                }
            }

            setData(arr);
        }
    }, [displayType]);

    const [activityList, setActivityList] = useState([]);

    const [numberOfDataToShow, setNumberOfDataToShow] = useState(10);
    const [displayedActivityList, setDisplayedActivityList] = useState([]);

    // To show only 10 transactions at a time
    useEffect(() => {
        const list = activityList?.slice(0, numberOfDataToShow);
        setDisplayedActivityList(list);
    }, [activityList, numberOfDataToShow]);

    const colors = {
        teal: '#6C93B9',
        blueGrey: '#607D8B',
        lightGrey: '#eee',
    };

    // Area chart function
    function RechartsDemo() {
        // Area chart Label list format function
        function changeFormat(data) {
            const formatter = data?.y ? '₹' + data.y : '';
            return formatter;
        }
        return (
            <div className='line_chart'>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
                    >
                        <XAxis
                            dataKey='x'
                            style={{ fontSize: '10px' }}
                            tick={{ fill: '#1D4772' }}
                        />
                        <YAxis hide={true} />

                        <Area
                            activeDot={{
                                stroke: '#5277C8',
                                strokeWidth: 1,
                                r: 4,
                                fill: '#fff',
                            }}
                            dot={{
                                stroke: '#5277C8',
                                strokeWidth: 1,
                                r: 3,
                                fill: '#FFF',
                            }}
                            stroke='#8884d8'
                            fillOpacity={1}
                            dataKey='y'
                            isAnimationActive={false}
                            fill={colors.teal}
                        >
                           {displayType==='Week'? <LabelList
                                dataKey={changeFormat}
                                position='top'
                                offset={10}
                                style={{ fontSize: '10px' }}
                                fill='#1D4772'
                            /> : void 0}
                        </Area>
                        <Tooltip
                            content={({ payload, label, active }) => {
                                if (active) {
                                    return (
                                        <div
                                            style={{
                                                backgroundColor:
                                                    'rgba(255,255,255,0.7)',
                                                fontSize: 12,
                                                padding: 5,
                                                borderRadius: 8,
                                                border: 'solid 1px rgba(0,0,0,0.6)',
                                            }}
                                        >
                                            <p>{label}</p>

                                            <p>Amount: ₹{payload[0].value}</p>
                                        </div>
                                    );
                                }

                                return null;
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }
    // All transaction function
    const renderActivity = ({ item, index, array }) => {
        const { merchant_image, merchant, category, date, amount = 0 } = item;

        const UTC_Date = new Date(
            date?.split('-')[0],
            date?.split('-')[1] - 1,
            date?.split('-')[2]
        );

        const sign = Math.sign(amount);
        const amountAbs = Math.abs(amount);

        const newDate = new Date(UTC_Date).toDateString();

        return (
            <div
                key={index}
                onClick={() => history.push('transactionDetail', { item })}
                className='segment_body'
            >
                <div className='segment_div'>
                    <div className='d-inline-flex align-items-center'>
                        <img
                            className='segment_activity_img'
                            alt='Transaction Image'
                            src={merchant_image}
                            height={40}
                            width={40}
                        />
                        <div className='pl-2 d-block align-items-center'>
                            <p className='segment_title'>{merchant}</p>
                            <p className='segment_date'>{newDate}</p>
                        </div>
                    </div>
                    <div>
                        <p
                            style={{
                                color: sign === -1 ? '#6d7274' : '#4BBB56',
                                fontSize: '1.3rem',
                                textAlignLast: 'end',
                            }}
                        >
                            {sign === -1 ? '-' : '+'}₹{amountAbs}
                        </p>
                        <p className='segment_category'>{category}</p>
                    </div>
                </div>
            </div>
        );
    };
    if (loading) return <Loader />;

    return (
        <>
            <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
            <RechartsDemo />
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
export default withRouter(TransactionSection);
