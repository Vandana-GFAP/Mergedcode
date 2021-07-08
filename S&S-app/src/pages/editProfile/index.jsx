import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { kycNotVerified, kycVerified, uploadImage } from "../../assets/images";
import { updateEmailID } from '../../redux/actions/util.action';
import { getFullName } from "../../util/util";
// ### Error modal component path
import ErrorModal from '../../components/modal/output/ErrorModal';
// ### success modal component path
import ConfirmationSuccessModal from '../../components/modal/output/ConfirmationSuccessModal';
import MainButton from '../../components/mainButton';
import { getLanguageText } from '../../language';
import useUserMobileNumber from "../../hooks/useUserMobileNumber";
import "./style.css";
import useAppLanguage from "../../hooks/useAppLanguage";
import EnterMPINModal from '../../components/modal/mpin/EnterMPINModal';

const EditProfile = ({ history }) => {
  const dispatch = useDispatch();
  const { currentUserDetails } = useSelector(state => ({
    currentUserDetails: state.userDataReducer.currentUserDetails
  }));

  const {
    fName,
    lName,
    email,
    city,
    mobile,
    ovdNumber,
    isKycVerified,
    profile_picture = "https://www.clipartmax.com/png/small/405-4050774_avatar-icon-flat-icon-shop-download-free-icons-for-avatar-icon-flat.png",
  } = currentUserDetails;

  const [file, setFile] = useState(profile_picture);
  const [userEmail, setUserEmail] = useState(email);
  const [userLocation, setUserLocation] = useState(city);
  // ### creating error modal state
  const [errorCard, setErrorCard] = useState(false);
  // ### creating success modal state
  const [successCard, setSuccessCard] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [mobileNumber] = useUserMobileNumber();
  const [language] = useAppLanguage();
  const [isMPINAsked, setIsMPINAsked] = useState(false);

  // useEffect(() => {
  //   if (tokenNotExist)
  //     history.push('/');
  // }, [history, tokenNotExist]);

  // useEffect(() => {
  //   if (mobileNumber)
  //     dispatch(getCurrentUserDetails({ payload: { mobile: mobileNumber } }))
  //       .catch(err => console.log(err));
  // }, [dispatch, mobileNumber]);

  useEffect(() => {
    setFile(profile_picture);
    setUserEmail(email);
    setUserLocation(city);
  }, [currentUserDetails, profile_picture, email, city]);

  const inputData = [
    {
      id: 'name',
      label: 'Name',
      value: getFullName({ fName, lName }),
    },
    {
      id: 'email',
      label: 'Email',
      value: userEmail,
      onChange: setUserEmail,
      disabled: false,
      errorText: 'Enter Valid Email',
      errorCheck: isEmailValid,
      setError: setIsEmailValid,
    },
    {
      id: 'phone',
      label: 'Phone No.',
      value: mobile,
    },
    {
      id: 'city',
      label: 'Location',
      value: userLocation,
      onChange: setUserLocation,
      disabled: true,
    },
    {
      id: 'ovd',
      label: 'OVD ID',
      value: ovdNumber,
    },
  ];

  const renderInput = ({ item, index }) => {
    const {
      id = "",
      label = "",
      value = "",
      onChange = () => { },
      disabled = true,
      errorCheck = false,
      setError = () => { },
      errorText = '',
    } = item;

    return (
      <div key={index} className='render-input'>
        <label htmlFor={id}>{label}</label>
        <input
          disabled={disabled}
          value={value}
          onChange={event => onChange(event.target.value)}
          id={id}
          onFocus={() => setError(false)}
        />
        {errorCheck ? (
          <p style={{ color: 'red', fontSize: 14, fontStyle: 'italic' }}>
            {errorText}
          </p>
        ) : null}
      </div>
    );
  };

  const onFileUpload = ({ event }) => {
    const file = event?.target?.files[0];
    try {
      //TODO: API call to upload the updated profile picture to CloudStorage
      const updatedFileUri = profile_picture; //* Received from backend

      console.log('File uploaded Successfully');
      console.log('<<< New URL for image >>>', updatedFileUri);

      setFile(updatedFileUri);
    } catch (err) {
      console.log('<<< Error in uploading profile picture >>>\n', err);
    }
  };

  const validateEmail = () => {
    var mailformat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return (userEmail?.match(mailformat)) ? true : false;
  };

  const dispatchEditProfileAction = ({ mpin }) => {
    const updatedEmailIDPayload = {
      email: userEmail,
      mobile: mobileNumber,
      mpin
      // profile_picture: file,
    }
    dispatch(updateEmailID({ payload: { ...updatedEmailIDPayload } }))
      .then(() => {
        history.goBack();
      })
      .catch(err => {
        console.log('<<< Error in updating profile >>>\n', err);
      });
  }

  const onSave = () => {
    //TODO: API call to update the data to backend
    if (validateEmail()) {
      setIsMPINAsked(true);
    }
    else
      setIsEmailValid(true);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }} >
      {/* ### Error Modal  */}
      <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />   ### error modal state true
      {/* ### Success Modal  */}
      <ConfirmationSuccessModal
        modalToggle={successCard}
        setModalToggle={setSuccessCard}             // ### success modal state true
      />
      <div className='profile'>
        {file ? <img src={file} /> : <img src={uploadImage} />}
        <label htmlFor='upload-photo'>
          {getLanguageText({ language, key: 'selectImage' })}
        </label>
        <input
          name='photo'
          id='upload-photo'
          type='file'
          accept='image/x-png,image/jpg,image/jpeg'
          onChange={event => onFileUpload({ event })}
        />
      </div>

      <div className='kyc-icon'>
        {isKycVerified ? (
          <div>
            <img src={kycVerified} />
            <p>{getLanguageText({ language, key: 'kycVerify' })}</p>
          </div>
        ) : (
          <div>
            <img src={kycNotVerified} />
            <p>{getLanguageText({ language, key: 'kycNotVerify' })}</p>
          </div>
        )}
      </div>

      <div style={{ padding: '1rem' }}>
        {inputData?.map((item, index) => renderInput({ item, index }))}
      </div>
      <div style={{ padding: '1rem 1.875rem' }}>
        <MainButton
          label={getLanguageText({ language, key: 'save' })}
          onClick={() => onSave()}
        />
      </div>
      {
        isMPINAsked &&
        <EnterMPINModal
          modalToggle={isMPINAsked}
          setModalToggle={setIsMPINAsked}
          callbackFunction={dispatchEditProfileAction}
        />
      }
    </div>
  );
};

export default withRouter(EditProfile);
