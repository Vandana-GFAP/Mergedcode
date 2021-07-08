import React, { useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import ProgressCard from '../../components/progressCard';
import { paymentBanner, qrCode } from '../../assets/images';
import { cardDetails, userData } from '../../dummyData';
import store from '../../redux/store';
import * as actions from '../../redux/actions';
import { useSelector } from 'react-redux';
import MainButton from '../../components/mainButton';
import { getLanguageText } from '../../language';
const RequestUPI = props => {
    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};
    const { history = {} } = props || {};
    const [selectedCard, setSelectedCard] = useState({});
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        //API call to get card list
        setCardList(cardDetails);
    }, []);

    useEffect(() => {
        setSelectedCard(cardList?.[0]);
    }, [cardList]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/');
        } else if (Object.keys(UserData).length <= 0) {
            //TODO: API call to get user data...
            try {
                store.dispatch(actions.setUserData({ ...userData }));
            } catch (err) {
                console.log('<<< Error in fetching user data >>>\n', err);
            }
        }
    }, []);

    return (
        <div>
            <div className='requester-body'>
                <Carousel
                    preventDefaultTouchmoveEvent={true}
                    enableMouseSwipe={true}
                    enableSwipe={true}
                    showArrows={false}
                    initialFirstItem={0}
                    onChange={({ item, index }) => {
                        const { cardDetails = {} } = item || {};
                        setSelectedCard(cardDetails);
                    }}
                >
                    {cardList?.map((item, index) => {
                        return <ProgressCard key={index} cardDetails={item} />;
                    })}
                </Carousel>

                <div className='requester_box'>
                    <p className='requester_title'>
                    {getLanguageText({ language, key: "requestUpi" })}
                    </p>

                    <p className='requester_subtitle'>
                    {getLanguageText({ language, key: "requestVidSub" })}
                        {' XXX XXX XXX ' +
                        String(selectedCard?.cardNumber)?.slice(12, 16)}
                    </p>

                    <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                        <img src={qrCode} className='qr_img' alt='QR Code' />
                        <p className='upi_text'>UPI ID : {selectedCard?.upi}</p>
                    </div>

                    <div style={{ paddingBottom: '10px' }}>
                        <MainButton label={getLanguageText({ language, key: "shareDetail" })} />
                    </div>

                    <div className='paymentImage'>
                        <img src={paymentBanner} alt='Payment Banner Icon' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestUPI;
