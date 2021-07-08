import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CustomButtom from '../button';

import { closeIcon } from '../../assets/images';
import './style.css';
import { useSelector } from 'react-redux';
import { getLanguageText } from '../../language';
import ConfirmationSuccessModal from './ConfirmationSuccessModal';
import ErrorModal from './ErrorModal';

const AddNotes = props => {
    const {
        modalToggle,
        setModalToggle,
        note = '',
        setNote = () => {},
    } = props;

    const [data, setData] = useState(note);

    const UserData = useSelector(state => state.UserData) || {};
    const { language } = UserData || {};
    const [error, setError] = useState(false);

    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const modalToggleFunc = () => {
        setModalToggle(!modalToggle);
    };
    const closeBtn = (
        <button className='closeBtn close' onClick={modalToggleFunc}>
            <img src={closeIcon} alt='Close Modal Icon' />
        </button>
    );
    const onSubmit = () => {
        try {
            setModalToggle(false);
            setSuccess(true);

            setNote(data);
        } catch (err) {
            console.log('<<< Error in add notes >>>\n', err);
            setError(true);
            setFailure(true);
        }
    };
    return (
        <>
            <ConfirmationSuccessModal
                modalToggle={success}
                setModalToggle={setSuccess}
            />

            <ErrorModal modalToggle={failure} setModalToggle={setFailure} />

            <Modal
                isOpen={modalToggle}
                centered={true}
                toggle={modalToggleFunc}
                contentClassName='customStyle'
            >
                <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
                    <p className='change_text'>
                        {getLanguageText({ language, key: 'addNotes' })}
                    </p>
                </ModalHeader>

                <ModalBody>
                    <div>
                        <textarea
                            style={{
                                width: '100%',
                                borderRadius: '5px',
                                border: '0.3px solid #A5A5A5',
                                padding: '0.5rem',
                                outline: 'none',
                                resize: 'none',
                            }}
                            type='text'
                            maxLength='120'
                            value={data}
                            onChange={event => {
                                setData(event.target.value);
                            }}
                            onFocus={() => setError(false)}
                            placeholder={getLanguageText({
                                language,
                                key: 'notesArea',
                            })}
                            rows='3'
                        />
                        {error && (
                            <p className='error_validate'>
                                {getLanguageText({ language, key: 'error' })}
                            </p>
                        )}
                        <div className='btn_section text-center'>
                            <CustomButtom
                                onClick={onSubmit}
                                label={getLanguageText({
                                    language,
                                    key: 'save',
                                })}
                            />
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};
export default AddNotes;
