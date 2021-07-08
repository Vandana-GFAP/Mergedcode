import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon } from '../../../assets/images';
import CustomButtom from '../../button';
import '../style.css';
import { getLanguageText } from '../../../language';
import useAppLanguage from '../../../hooks/useAppLanguage';

const EnterMPINModal = ({ modalToggle, setModalToggle, callbackFunction }) => {
    const [language] = useAppLanguage();

    const modalToggleFunc = () => {
        setModalToggle(!modalToggle);
    };

    const closeBtn = (
        <button className='closeBtn close' onClick={modalToggleFunc}>
            <img src={closeIcon} />
        </button>
    );

    const [mpin, setMpin] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setMpin('');
        setError(false);
    }, []);

    const onSubmit = () => {
        if (mpin?.length != 6) {
            setError(true);
            return;
        }
        callbackFunction({ mpin });
        modalToggleFunc();
    };

    return (
        <Modal
            isOpen={modalToggle}
            centered={true}
            toggle={modalToggleFunc}
            contentClassName='customStyle'
        >
            <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
                <p className='change_text'>
                    {getLanguageText({ language, key: 'mPinModal' })}
                </p>
            </ModalHeader>

            <ModalBody>
                <div className='d-flex flex-column align-items-center'>
                    <input
                        className='input_fields'
                        type='number'
                        placeholder={getLanguageText({ language, key: 'enterMpin' })}
                        value={mpin}
                        onChange={event => {
                            if (event.target.value.length <= 6) setMpin(event.target.value);
                        }}
                        onFocus={() => setError(false)}
                    />
                    {error && (
                        <p className='error_validate'>
                            {getLanguageText({ language, key: 'errorMPin' })}
                        </p>
                    )}

                    <div className='btn_section'>
                        <CustomButtom
                            label={getLanguageText({ language, key: 'submit' })}
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default EnterMPINModal;