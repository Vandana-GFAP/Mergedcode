import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { closeIcon, errorIcon } from "../../assets/images";
import "./style.css";
import store from "../../redux/store";
import * as actions from "../../redux/actions";
import { userData } from "../../dummyData";
import { getLanguageText } from "../../language";
import { useSelector } from "react-redux";
const ErrorModal = (props) => {
  const { modalToggle, setModalToggle } = props;

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const UserData = useSelector((state) => state.UserData) || {};

  const { language } = UserData || {};

  const closeBtn = (
    <button className="closeBtn close" onClick={modalToggleFunc}>
      <img src={closeIcon} alt="Close Icon Image" />
    </button>
  );

  const onConfirm = () => {
    //TODO: API call to set error
    try {
      const updatedUserData = {
        ...userData,
      }; //* Received from backend
      //* Received from backend
      setModalToggle(false);
      store.dispatch(actions.setUserData({ ...updatedUserData }));
    } catch (err) {
      setModalToggle(true);
      console.log("<<< Error occured >>>\n", err);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalToggle}
        centered={true}
        toggle={modalToggleFunc}
        contentClassName="customStyle"
      >
        <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
          <p className="change_text">
            {getLanguageText({ language, key: "errorMsg" })}
          </p>
        </ModalHeader>

        <ModalBody>
          <div className="d-flex align-items-center flex-column">
            <img src={errorIcon} className="confirmation_img" alt="Error Icon" />
            <p className="confirmation_text">
              {getLanguageText({ language, key: "errorMessage" })}
            </p>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default ErrorModal;
