import React, { useEffect, useState } from 'react';
import './style.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import RecentActivity from '../../components/recentActivity';
import { FaPlusCircle } from 'react-icons/fa';
import { getLanguageText } from '../../language';
import { useSelector } from 'react-redux';
import BeneficiaryAccount from '../../components/modal/BeneficiaryAccount';
import BeneficiaryCard from '../../components/modal/BeneficiaryCard';
import { withRouter } from 'react-router-dom';

const SendMoney = props => {
    const { history = {} } = props || {};

    const [beneficiaryAccount, setBeneficiaryAccount] = useState();
    const [beneficiarySetCard, setBeneficiarySetCard] = useState();
    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};

    const inputBox = [
        {
            id: 1,
            heading: getLanguageText({ language, key: 'sendMoneyCard' }),
            subheading: getLanguageText({ language, key: 'sendMoneyCardSNS' }),
            onClick: () => setBeneficiarySetCard(true),
            onClickUser: item => history.push('/sendMoneyCard', { item }),
        },
        {
            id: 2,
            heading: getLanguageText({ language, key: 'sendMoneyAccount' }),
            subheading: getLanguageText({
                language,
                key: 'sendMoneyAccountSNS',
            }),
            onClick: () => setBeneficiaryAccount(true),
            onClickUser: item => history.push('/sendMoneyAccount', { item }),
        },
    ];
    const PaymentBox = ({ item }) => {
        const {
            heading,
            subheading,
            onClick = () => {},
            onClickUser = () => {},
        } = item;
        const [openBlock, setOpenBlock] = useState();

        const clickHandler = () => {
            setOpenBlock(openBlock => !openBlock);
        };

        const [userList, setUserList] = useState([]);

        useEffect(() => {
            //* API calll to get the userList;
            setUserList([
                {
                    name: 'Saksham',
                    image: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
                },
                {
                    name: 'Anoop',
                    image: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
                },
                {
                    name: 'biawufghr owgufi rwoiugbeu',
                    image: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
                },
                {
                    name: 'ohgehrghjreghjwerhgiheowihg',
                    image: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
                },
            ]);
        }, []);

        return (
            <>
                <div
                    onClick={clickHandler}
                    className='box_payment d-flex justify-content-between align-items-center'
                >
                    <div className='d-block justify-content-center'>
                        <p className='_box_head'>{heading}</p>
                        <p className='_box_subhead'>{subheading}</p>
                    </div>
                    <div className='icon_style'>
                        {openBlock ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                </div>
                <div>
                    {openBlock ? (
                        <div
                            style={{
                                display: 'flex',
                                // alignItems: 'center',
                                justifyContent: 'space-around',
                                padding: '0.5rem',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    overflow: 'scroll',
                                    margin: '0 0 0 1rem',
                                    flex: 1,
                                }}
                            >
                                {userList?.map((item, index) => {
                                    const { name, image } = item || {};

                                    return (
                                        <div
                                            key={index}
                                            
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                    {/* Backend call for removal of added user */}
                                            <span className="remove_user">-</span>
                                            <img
                                            onClick={() => onClickUser(item)}
                                                src={image}
                                                alt=''
                                                height={50}
                                                width={50}
                                                style={{ borderRadius: '50%' }}
                                            />
                                            
                                            <p
                                                style={{
                                                    fontSize: 12,
                                                    color: '#123975',
                                                    textAlign: 'center',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    width: '3rem',
                                                    height: '1rem',
                                                }}
                                            >
                                                {name}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                className='toggleBlock'
                                onClick={() => onClick()}
                            >
                                <FaPlusCircle className='add_Icon' />
                                <p>
                                    {getLanguageText({ language, key: 'add' })}
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </>
        );
    };

    return (
        <>
            <BeneficiaryAccount
                modalToggle={beneficiaryAccount}
                setModalToggle={setBeneficiaryAccount}
            />
            <BeneficiaryCard
                modalToggle={beneficiarySetCard}
                setModalToggle={setBeneficiarySetCard}
            />
            <div style={{ margin: '25px 0px' }}>
                {inputBox?.map((item, index) => (
                    <PaymentBox key={index} item={item} />
                ))}
            </div>
            <RecentActivity />
        </>
    );
};
export default withRouter(SendMoney);
