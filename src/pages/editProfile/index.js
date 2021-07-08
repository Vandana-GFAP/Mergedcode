import React, { useState, useEffect } from 'react';
import { kycNotVerified, kycVerified, uploadImage } from '../../assets/images';
import { userData } from '../../dummyData';
import './style.css';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import * as actions from '../../redux/actions';
// ### Error modal component path
import ErrorModal from '../../components/modal/ErrorModal';
// ### success modal component path
import ConfirmationSuccessModal from '../../components/modal/ConfirmationSuccessModal';
import MainButton from '../../components/mainButton';
import { getLanguageText } from '../../language';
import Loader from "../../components/loader";

const EditProfile = props => {
  const { history = {} } = props || {};
  const [loading, setLoading] = useState(false);

  const UserData = useSelector(state => state.UserData) || {};
  const { language } = UserData || {};

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    } else if (Object.keys(UserData).length <= 0) {
      //TODO: API call to get user data...
      store.dispatch(actions.setUserData({ ...userData }));
    }
  }, []);

  useEffect(() => {
    const { profile_picture, email, location } = UserData;
    setFile(profile_picture);
    setUserEmail(email);
    setUserLocation(location);
  }, [UserData]);

  const {
    name,
    email,
    location,
    phone,
    ova_id,
    isKycVerified,
    profile_picture,
  } = UserData || {};

  const [file, setFile] = useState(profile_picture);
  const [userEmail, setUserEmail] = useState(email);
  const [userLocation, setUserLocation] = useState(location);
  // ### creating error modal state
  const [errorCard, setErrorCard] = useState(false);
    // ### creating success modal state
  const [successCard, setSuccessCard] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const inputData = [
    {
      id: 'name',
      label: 'Name',
      value: name,
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
      value: phone,
    },
    {
      id: 'location',
      label: 'Location',
      value: userLocation,
      onChange: setUserLocation,
      disabled: true,
    },
    {
      id: 'ovd',
      label: 'OVD ID',
      value: ova_id,
    },
  ];

  const renderInput = ({ item, index }) => {
    const {
      id = '',
      label = '',
      value = '',
      onChange = () => {},
      disabled = true,
      errorCheck = false,
      setError = () => {},
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
    setLoading(true)

    try {
      setLoading(false)

      //TODO: API call to upload the updated profile picture to CloudStorage
      const updatedFileUri = profile_picture; //* Received from backend

      console.log('File uploaded Successfully');
      console.log('<<< New URL for image >>>', updatedFileUri);

      setFile(updatedFileUri);
    } catch (err) {
      setLoading(false)

      console.log('<<< Error in uploading profile picture >>>\n', err);
    }
  };

  const validateEmail = () => {
    var mailformat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (userEmail?.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };

  const onSave = () => {

    //TODO: API call to update the data to backend

    if (validateEmail()) {
      setLoading(true)

      try {
        setLoading(false)

        const updatedUserData = {
          ...userData,
          email: userEmail,
          location: userLocation,
          profile_picture: file,
        }; //* Received from backend

          // ### success modal state true
        setSuccessCard(true);
        store.dispatch(actions.setUserData({ ...updatedUserData }));
      } catch (err) {
        setLoading(false)

        // ### error modal state true
        setErrorCard(true);
        console.log('<<< Error in updating profile >>>\n', err);
      }
    } else {
      setIsEmailValid(true);
    }
  };
  if (loading) return <Loader />;

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
    {/* ### Error Modal  */}
      <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
       {/* ### Success Modal  */}
      <ConfirmationSuccessModal
        modalToggle={successCard}
        setModalToggle={setSuccessCard}
      />
      <div className='profile'>
        {file ? <img src={file} alt="File Icon" /> : <img src={uploadImage} alt="File Icon" />}
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
            <img src={kycVerified} alt="KYC Icon"/>
            <p>{getLanguageText({ language, key: 'kycVerify' })}</p>
          </div>
        ) : (
          <div>
            <img src={kycNotVerified} alt="Kyc Not Verified Icon" />
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
    </div>
  );
};

export default EditProfile;
