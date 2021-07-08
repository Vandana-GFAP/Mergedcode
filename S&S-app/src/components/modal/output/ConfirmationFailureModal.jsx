import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { closeIcon, errorIcon } from "../../../assets/images";
import "./style.css";
import { getLanguageText } from "../../../language";
import useAppLanguage from "../../hooks/useAppLanguage";

export const ConfirmationFailureModal = ({ modalToggle, setModalToggle }) => {

  const [language] = useAppLanguage();

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className="closeBtn close" onClick={modalToggleFunc}>
      <img src={closeIcon} />
    </button>
  );

  const onConfirm = () => {
    //TODO: API call to freeze the Card
    try {
      const updatedUserData = {
        ...userData,
      }; // Receive from backend
      setModalToggle(false);
      store.dispatch(actions.setUserData({ ...updatedUserData }));
    } catch (err) {
      console.log("<<< Error in freezing card >>>\n", err);
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
            {getLanguageText({ language, key: "confirmation" })}
          </p>
        </ModalHeader>

        <ModalBody>
          <div className="d-flex align-items-center flex-column">
            <div>
              <p className="confirmation_text">
                {getLanguageText({ language, key: "failure" })}
              </p>
              <div>
                <img src={errorIcon} />
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};