import React, { useState, useEffect } from 'react';
import {
  editProfile,
  kycImage1,
  kycImage2,
  kycNotVerified,
  kycVerified,
} from '../../assets/images';
import { userData } from '../../dummyData';
import './index.css';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import * as actions from '../../redux/actions';
import Carousel from 'react-elastic-carousel';
import MainButton from '../../components/mainButton';
import Loader from "../../components/loader";

const Profile = props => {
  const { history = {} } = props;
  const [loading, setLoading] = useState(false);

  const [carouselImages, setCarouselImages] = useState([]);

  const UserData = useSelector(state => state.UserData) || {};
  useEffect(() => {
    setLoading(true)

    if (!localStorage.getItem('token')) {
      history.push('/');
    } else if (Object.keys(UserData).length <= 0) {
      //TODO: API call to get user data...
      try {
        setLoading(false)

        store.dispatch(actions.setUserData({ ...userData }));
      } catch (err) {
        setLoading(false)

        console.log('<<< Error in fetching user data from backend >>>\n', err);
      }
    }
  }, []);

  useEffect(() => {
    setLoading(true)

    //TODO: Get the images for carousel from backend
    try {
      setLoading(false)

      setCarouselImages([kycImage1, kycImage2,]);
    } catch (err) {
      setLoading(false)

      console.log('<<< Error in getting images from backend >>>\n', err);
    }
  }, []);

  const {
    name,
    profile_picture,
    email,
    phone,
    ova_id,
    isKycVerified,
  } = UserData;

  const completeKyc = () => {
    setLoading(true)

    //TODO: API call to complete KYC...
    try {
      setLoading(false)

    } catch (err) {
      setLoading(false)

      console.log(' <<<Error in completion of kyc>>>', err);
    }
  };


  if (loading) return <Loader />;



  return (
    <>
      <div id='profile'>
        <div id='profile_picture'>
          <img src={profile_picture} alt="Profile Icon"/>
        </div>

        <div id='user-data'>
          <div>
            <p className='key'>Name</p>
            <p className='value'>{name}</p>
          </div>
          <div>
            <p className='key'>E-Mail</p>
            <p className='value'>{email}</p>
          </div>
          <div>
            <p className='key'>Phone No.</p>
            <p className='value'>{phone}</p>
          </div>
          <div>
            <p className='key'>OVD ID</p>
            <p className='value'>{ova_id}</p>
          </div>
        </div>

        <div
          style={{ display: 'flex', alignSelf: 'flex-start', flex: 1 }}
          onClick={() => history.push('edit')}
        >
          <img src={editProfile} alt="Edit Icon"/>
        </div>
      </div>

      <div className='kyc-icon'>
        {isKycVerified ? (
          <div>
            <img src={kycVerified} alt="KYC Icon"/>
            <p>KYC Verified</p>
          </div>
        ) : (
          <div>
            <img src={kycNotVerified} alt="KYC Not Verified Icon" />
            <p>KYC Not Verified</p>
          </div>
        )}
      </div>

      {isKycVerified ? null : (
        <div className='kyc-text'>
          <p className='kyc_info-txt'>
            It seems that your KYC is Incomplete. Please click the link to
            complete it.
          </p>
          <p className='kyc_info-link' onClick={() => completeKyc()}>
            Complete KYC
          </p>
        </div>
      )}

      <div className='banner'>
        {carouselImages?.length > 0 && (
          <Carousel
            preventDefaultTouchmoveEvent={true}
            enableMouseSwipe={true}
            enableSwipe={true}
            showArrows={false}
            className='mb-3'
          >
            {carouselImages?.map((item, index) => {
              return <img key={index} alt="Banner Image" className='banner_carousel' src={item} />;
            })}
          </Carousel>
        )}
        <img src={kycImage2} alt="KYC Image" />
      </div>

      {isKycVerified ? null : (
        <div style={{ padding: '0 1.875rem 1rem 1.875rem' }}>
          <MainButton label='Complete KYC' onClick={() => completeKyc()} />
        </div>
      )}
    </>
  );
};

export default Profile;
