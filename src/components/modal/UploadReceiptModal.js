import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { camera, gallery } from '../../assets/images';
import './style.css';
import { useSelector } from 'react-redux';
import { getLanguageText } from '../../language';
const UploadReceiptModal = props => {
    const { modalToggle, setModalToggle, file, setFile = () => {} } = props;

    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};

    const onFileUpload = ({ event }) => {
        const uploadedFile = event?.target?.files[0]; //uploaded file

        try {
            //TODO: API call to upload the updated profile picture to CloudStorage
            const updatedFileUri =
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'; //* Received from backend

            console.log('File uploaded Successfully');
            console.log('<<< New URL for image >>>', updatedFileUri);
            setFile(updatedFileUri);
            setModalToggle(false);
        } catch (err) {
            console.log('<<< Error in uploading profile picture >>>\n', err);
        }
    };

    const categoryIcon = [
        {
            title: getLanguageText({ language, key: 'gallery' }),
            icon: gallery,
            typeImage: 'image/x-png,image/jpg,image/jpeg',
        },
        {
            title: getLanguageText({ language, key: 'camera' }),
            icon: camera,
            typeImage: 'image/*',
            restProps: { capture: '' },
        },
    ];

    const modalToggleFunc = () => {
        setModalToggle(!modalToggle);
    };

    return (
        <>
            <Modal
                isOpen={modalToggle}
                centered={true}
                toggle={modalToggleFunc}
                contentClassName='customStyle'
            >
                <ModalBody>
                    <div className='d-flex flex-wrap justify-content-around align-items-center'>
                        {categoryIcon?.map((item, index) => {
                            const {
                                title,
                                icon,
                                typeImage,
                                restProps = {},
                            } = item;
                            return (
                                <div
                                    key={index}
                                    className='d-flex flex-column justify-content-around align-items-center'
                                >
                                    <label htmlFor='photos'>
                                        <img
                                            src={icon}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                            }}
                                            alt='Gallery Icon'
                                        />
                                        <p
                                            style={{
                                                fontSize: '15px',
                                                color: '#3677A3',
                                                padding: '5px 0',
                                            }}
                                        >
                                            {title}
                                        </p>
                                    </label>
                                    <input
                                        name='photos'
                                        id='photos'
                                        accept={typeImage}
                                        type='file'
                                        {...restProps}
                                        onChange={event =>
                                            onFileUpload({ event })
                                        }
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};
export default UploadReceiptModal;
