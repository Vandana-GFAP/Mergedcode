import React, { useEffect, useState } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import { recentData } from '../../dummyData/index';
import { getLanguageText } from '../../language';
import { useSelector } from 'react-redux';
const RecentActivity = props => {
    const { isCardFrozen = false } = props;
    const { history = {} } = props || {};

    const NUMBER_OF_TRANSACTIONS = 10;

    const [activityList, setActivityList] = useState([]);
    const [todayList, setTodayList] = useState([]);
    const [yesterdayList, setYesterdayList] = useState([]);
    const [olderList, setOlderList] = useState([]);

    useEffect(() => {
        //TODO: API call to get activity list
        try {
            setActivityList(recentData);
        } catch (err) {
            console.log('<<< Error in Fetching Activity List >>>\n', err);
        }
    }, []);

    useEffect(() => {
        const array = activityList?.filter(
            (item, index) => index < NUMBER_OF_TRANSACTIONS
        );

        let todayArray = [];
        let yesterdayArray = [];
        let olderArray = [];

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        todayArray = array?.filter((item, index) => {
            const { date } = item;

            const UTC_Date = new Date(
                date?.split('-')[0],
                date?.split('-')[1] - 1,
                date?.split('-')[2]
            );

            if (
                new Date(UTC_Date)?.toLocaleDateString() ===
                today?.toLocaleDateString()
            )
                return item;
        });
        setTodayList(todayArray);

        yesterdayArray = array?.filter((item, index) => {
            const { date } = item;

            const UTC_Date = new Date(
                date?.split('-')[0],
                date?.split('-')[1] - 1,
                date?.split('-')[2]
            );

            if (
                new Date(UTC_Date)?.toLocaleDateString() ===
                yesterday?.toLocaleDateString()
            )
                return item;
        });
        setYesterdayList(yesterdayArray);

        olderArray = array?.filter((item, index) => {
            const { date } = item;

            const UTC_Date = new Date(
                date?.split('-')[0],
                date?.split('-')[1] - 1,
                date?.split('-')[2]
            );

            if (
                new Date(UTC_Date)?.toLocaleDateString() !==
                    today?.toLocaleDateString() &&
                new Date(UTC_Date)?.toLocaleDateString() !==
                    yesterday?.toLocaleDateString()
            )
                return item;
        });
        setOlderList(olderArray);
    }, [activityList]);

    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};

    return (
        <>
            <div className='Recent_box'>
                {isCardFrozen && (
                    <div className='card-frozen'>
                        <p className='card-frozen-title'>
                            {getLanguageText({ language, key: 'frozenTitle' })}
                        </p>
                        <p className='card-frozen-subtitle'>
                            {getLanguageText({ language, key: 'frozenDetail' })}
                        </p>
                    </div>
                )}

                <div className='d-flex justify-content-between align-items-center'>
                    <p className='recentTitle'>
                        {getLanguageText({ language, key: 'recentActivity' })}
                    </p>
                    <p
                        className='recent_all'
                        onClick={() => history?.push('/transaction')}
                    >
                        {getLanguageText({ language, key: 'seeAll' })}
                    </p>
                </div>

                {todayList?.length ? (
                    <>
                        <div className='date-title'>
                            <p>{getLanguageText({ language, key: 'today' })}</p>
                        </div>

                        {todayList?.length > 0 ? (
                            <div className='list-box'>
                                {todayList?.map((item, index, array) => {
                                    return renderActivity({
                                        item,
                                        index,
                                        array,
                                    });
                                })}
                            </div>
                        ) : (
                            <div className='no-data'>
                                <p>
                                    {getLanguageText({
                                        language,
                                        key: 'noData',
                                    })}
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    void 0
                )}

                {yesterdayList?.length ? (
                    <>
                        <div className='date-title'>
                            <p>
                                {getLanguageText({
                                    language,
                                    key: 'yesterday',
                                })}
                            </p>
                        </div>

                        {yesterdayList?.length > 0 ? (
                            <div className='list-box'>
                                {yesterdayList?.map((item, index, array) => {
                                    return renderActivity({
                                        item,
                                        index,
                                        array,
                                    });
                                })}
                            </div>
                        ) : (
                            <div className='no-data'>
                                <p>No Data For Yesterday!!</p>
                            </div>
                        )}
                    </>
                ) : (
                    void 0
                )}

                {olderList?.length ? (
                    <>
                        <div className='date-title'>
                            <p>{getLanguageText({ language, key: 'older' })}</p>
                        </div>

                        {olderList?.length > 0 ? (
                            <div className='list-box'>
                                {olderList?.map((item, index, array) => {
                                    return renderActivity({
                                        item,
                                        index,
                                        array,
                                    });
                                })}
                            </div>
                        ) : (
                            <div className='no-data'>
                                <p>No Data!!</p>
                            </div>
                        )}
                    </>
                ) : (
                    void 0
                )}
            </div>
        </>
    );
};

const renderActivity = ({ item, index, array }) => {
    const { merchant_image, merchant, category, amount } = item;

    const sign = Math.sign(amount);
    const amountAbs = Math.abs(amount);

    return (
        <div key={index} className='category_section'>
            <div
                className='optional_c'
                style={{
                    borderRadius:
                        index === 0
                            ? '1.3rem 1.3rem 0 0'
                            : index + 1 === array?.length
                            ? '0 0 1.3rem 1.3rem'
                            : '0 0 0 0',
                }}
            >
                <div className='d-inline-flex align-items-center'>
                    <img
                        className='img_category'
                        src={merchant_image}
                        height={40}
                        width={40}
                    />
                    <div className='pl-2 d-block align-items-center'>
                        <p className='category_title'>{merchant}</p>
                        <p className='category_subtitle'>{category}</p>
                    </div>
                </div>
                <div>
                    <p
                        className='amt_rupee'
                        style={{ color: sign === -1 ? '#6d7274' : '#4BBB56' }}
                    >
                        {sign === -1 ? '-' : '+'}₹{amountAbs}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default withRouter(RecentActivity);
