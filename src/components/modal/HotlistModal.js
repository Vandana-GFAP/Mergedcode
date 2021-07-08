import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon } from '../../assets/images';
import './style.css';
import { getLanguageText } from '../../language';
import { useSelector } from 'react-redux';
const HotlistModal = props => {
  const { modalToggle, setModalToggle } = props;

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const UserData = useSelector(state => state.UserData) || {};

  const { language } = UserData || {};

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} alt="Close Icon Image" />
    </button>
  );

  const onConfirm = () => {
    //TODO: API call to hotlist the Card
    try {
      setModalToggle(false);
    } catch (err) {
      console.log('<<< Error in hotlisting card >>>\n', err);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalToggle}
        centered={true}
        toggle={modalToggleFunc}
        contentClassName='customStyle'
      >
        <ModalHeader className="d-flex justify-content-center">
          <p className='change_text'>
            {getLanguageText({ language, key: 'hotlistTitle' })}
          </p>
        </ModalHeader>

        <ModalBody>
          <div className='d-flex align-items-center flex-column'>
            <div>
              <p className='confirm_texxt'>
                {getLanguageText({ language, key: 'hotlistText' })}
              </p>
            </div>

            <div className='confirmatn_div'>
              <div className='confirm_sectn' onClick={() => onConfirm()}>
                <p className='confirm_txt'>
                  {getLanguageText({ language, key: 'yes' })}
                </p>
              </div>

              <div
                className='confirm_sectno'
                onClick={() => setModalToggle(false)}
              >
                <p className='confirm_txt_no'>
                  {getLanguageText({ language, key: 'no' })}
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default HotlistModal;
