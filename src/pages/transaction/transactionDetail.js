import React, { useState } from 'react';
import {
    travelicon,
    rightarrow,
    note as noteIcon,
    uploadIcon,
    shareIcon,
} from '../../assets/images';
import './transactionDetail.css';
import CategoryModal from '../../components/modal/CategoryModal';
import AddNotes from '../../components/modal/AddNotes';
import UploadReceiptModal from '../../components/modal/UploadReceiptModal';
import ShareTransactionModal from '../../components/modal/ShareTransactionModal';
import { useSelector } from 'react-redux';
import { getLanguageText } from '../../language';

const TransactionDetail = props => {
    const { location: { state: { item = {} } = {} } = {} } = props || {};
    const [chooseCategory, setChooseCategory] = useState(false);
    const [addNotes, setAddNotes] = useState(false);
    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};
    const [shareTransaction, setShareTransaction] = useState(false);
    const [category, setCategory] = useState({
        image: 'https://static.thenounproject.com/png/101469-200.png',
        title: 'Choose Category',
    });

    const [file, setFile] = useState(null);
    const [uploads, setUploads] = useState(false);
    const {
        merchant_image,
        merchant,
        amount,
        transactionNo,
        trans_staus,
        date,
    } = item || {};

    const displayDate = new Date(date).toDateString();
    const displayTime = new Date(date).toLocaleTimeString();

    const [note, setNote] = useState('');

    const sign = Math.sign(amount);
    const amountAbs = Math.abs(amount);

    const optional = [
        {
            heading: getLanguageText({ language, key: 'transactionId' }),
            messages: transactionNo,
        },
        {
            heading: getLanguageText({ language, key: 'status' }),
            messages: trans_staus,
        },
        {
            heading: getLanguageText({ language, key: 'date' }),
            messages: displayDate,
        },
        {
            heading: getLanguageText({ language, key: 'time' }),
            messages: displayTime,
        },
    ];

    const category_box = [
        {
            type: 'category',
            heading: category?.title,
            imgsrc: category?.image,
            onClick: () => {
                setChooseCategory(true);
            },
        },
        {
            type: 'extra',
            heading: getLanguageText({ language, key: 'addNotes' }),
            subheading: getLanguageText({
                language,
                key: 'addNotesSubheading',
            }),
            imgsrc: noteIcon,
            onClick: () => {
                setAddNotes(true);
            },
        },
        {
            type: 'extra',
            heading: getLanguageText({ language, key: 'uploadReceipt' }),
            subheading: getLanguageText({ language, key: 'receiptSubheading' }),
            imgsrc: uploadIcon,
            onClick: () => {
                setUploads(true);
            },
        },
        {
            type: 'extra',
            heading: getLanguageText({ language, key: 'share' }),
            subheading: getLanguageText({ language, key: 'shareSubheading' }),
            imgsrc: shareIcon,
            onClick: () => {
                setShareTransaction(true);
            },
        },
    ];

    const renderoptional = ({ item, index }) => {
        const { heading, messages } = item;
        return (
            <div key={index} className='optional_css'>
                <p className='option_p'>{heading}</p>
                <p
                    className='option_p'
                    style={{
                        color:
                            messages === 'Success'
                                ? '#437723'
                                : messages === 'Pending'
                                ? 'blue'
                                : messages === 'Failed'
                                ? 'red'
                                : void 0,
                    }}
                >
                    {messages}
                </p>
            </div>
        );
    };

    const rendercategory = ({ item, index }) => {
        const { heading, imgsrc, subheading, onClick = () => {} } = item;
        return (
            <div key={index} className='optional_css' onClick={() => onClick()}>
                <div className='d-inline-flex align-items-center'>
                    <img src={imgsrc} alt='Transaction' height={30} />
                    <div
                        className='pl-2 d-block align-items-center'
                        style={{ overflowWrap: 'anywhere' }}
                    >
                        <p className='option_p'>{heading}</p>
                        <p className='option_subheading'>{subheading}</p>

                        {heading === 'Add Notes' ? (
                            <p className='note-details'>{note}</p>
                        ) : (
                            void 0
                        )}

                        {heading === 'Upload Receipt' && file ? (
                            <img src={file} alt='' height={45} />
                        ) : (
                            void 0
                        )}
                    </div>
                </div>
                <div>
                    <img src={rightarrow} alt='Arrow' />
                </div>
            </div>
        );
    };

    return (
        <>
            <div>
                <CategoryModal
                    modalToggle={chooseCategory}
                    setModalToggle={setChooseCategory}
                    category={category}
                    setCategory={setCategory}
                />
                <AddNotes
                    modalToggle={addNotes}
                    setModalToggle={setAddNotes}
                    note={note}
                    setNote={setNote}
                />
                <UploadReceiptModal
                    modalToggle={uploads}
                    setModalToggle={setUploads}
                    file={file}
                    setFile={setFile}
                />
                <ShareTransactionModal
                    modalToggle={shareTransaction}
                    setModalToggle={setShareTransaction}
                />
                <div className='detail_body'>
                    <img
                        src={merchant_image}
                        alt='category_img'
                        className='category_img'
                    />
                    <div className='d-flex justify-content-between category_box'>
                        <p className='category_titlee'>{merchant}</p>
                        <p className='category_amts'>
                            <span className='categoryrs'>
                                {sign === -1 ? '-' : '+'}
                                <span style={{ fontSize: '1.5rem' }}> ₹ </span>
                                {amountAbs}
                            </span>
                        </p>
                    </div>
                </div>
                <div className='pb-3'>
                    <p className='category_heading'>
                        {getLanguageText({
                            language,
                            key: 'transactionDetail',
                        })}
                    </p>
                    <div>
                        {optional?.map((item, index) => {
                            return renderoptional({ item, index });
                        })}
                    </div>
                    <p className='category_heading'>
                        {getLanguageText({ language, key: 'category' })}
                    </p>
                    {category_box?.map((item, index) => {
                        const { type } = item;
                        if (type === 'category') {
                            return rendercategory({ item, index });
                        }
                    })}
                    <p className='category_heading'>
                        {getLanguageText({ language, key: 'extra' })}
                    </p>
                    {category_box?.map((item, index) => {
                        const { type } = item;
                        if (type === 'extra') {
                            return rendercategory({ item, index });
                        }
                    })}
                </div>
            </div>
        </>
    );
};
export default TransactionDetail;
