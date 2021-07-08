import React, { useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  editProfile,
  kycImage1,
  kycImage2,
  kycNotVerified,
  kycVerified,
} from '../../assets/images';
import './index.css';
import { getCurrentUserDetails } from '../../redux/actions/userData.action';
import { getFullName } from '../../util/util';
import { updateKYC } from '../../redux/actions/util.action';
import MainButton from '../../components/mainButton';
import useUserMobileNumber from '../../hooks/useUserMobileNumber';
import useCheckTokensNotExists from '../../hooks/useCheckTokensNotExists';
import EnterMPINModal from '../../components/modal/mpin/EnterMPINModal';

const Profile = ({ history }) => {
  const dispatch = useDispatch();

  const [carouselImages, setCarouselImages] = useState([]);
  const [mobileNumber] = useUserMobileNumber();
  const [tokenNotExist] = useCheckTokensNotExists();
  const [isMPINAsked, setIsMPINAsked] = useState(false);

  const { currentUserDetails } = useSelector(state => ({
    currentUserDetails: state.userDataReducer.currentUserDetails,
  }));

  // useEffect(() => {
  //   if (tokenNotExist)
  //     history.push('/');
  // }, []);

  // useEffect(() => {
  //   if (mobileNumber)
  //     dispatch(getCurrentUserDetails({ payload: { mobile: mobileNumber } }))
  //       .catch(err => console.log(err));
  // }, [mobileNumber]);

  useEffect(() => {
    //TODO: Get the images for carousel from backend
    try {
      setCarouselImages([kycImage1, kycImage2]);
    } catch (err) {
      console.log('<<< Error in getting images from backend >>>\n', err);
    }
  }, []);

  const {
    fName,
    lName,
    profile_picture = "https://www.clipartmax.com/png/small/405-4050774_avatar-icon-flat-icon-shop-download-free-icons-for-avatar-icon-flat.png",
    email,
    mobile,
    ovdNumber,
    isKycVerified,
  } = currentUserDetails;

  const dispatchUpdateKYCAction = ({ mpin }) => {
    dispatch(updateKYC({ payload: { mobile: mobileNumber, mpin } }));
  }

  const completeKyc = () => {
    setIsMPINAsked(true);
  };

  return (
    <>
      <div id='profile'>
        <div id='profile_picture'>
          <img src={profile_picture} />
        </div>

        <div id='user-data'>
          <div>
            <p className='key'>Name</p>
            <p className='value'>{getFullName({ fName, lName })}</p>
          </div>
          <div>
            <p className='key'>E-Mail</p>
            <p className='value'>{email}</p>
          </div>
          <div>
            <p className='key'>Phone No.</p>
            <p className='value'>{mobile}</p>
          </div>
          <div>
            <p className='key'>OVA ID</p>
            <p className='value'>{ovdNumber}</p>
          </div>
        </div>

        <div
          style={{ display: 'flex', alignSelf: 'flex-start', flex: 1 }}
          onClick={() => history.push('edit')}
        >
          <img src={editProfile} />
        </div>
      </div>

      <div className='kyc-icon'>
        {isKycVerified ? (
          <div>
            <img src={kycVerified} />
            <p>KYC Verified</p>
          </div>
        ) : (
          <div>
            <img src={kycNotVerified} />
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
            {carouselImages?.map((item, idx) => {
              return <img className='banner_carousel' src={item} key={idx} />;
            })}
          </Carousel>
        )}
        <img src={kycImage2} />
      </div>

      {isKycVerified ? null : (
        <div style={{ padding: '0 1.875rem 1rem 1.875rem' }}>
          <MainButton label="Complete KYC" onClick={() => completeKyc()} />
        </div>
      )}
      {
        isMPINAsked &&
        <EnterMPINModal
          modalToggle={isMPINAsked}
          setModalToggle={setIsMPINAsked}
          callbackFunction={dispatchUpdateKYCAction}
        />
      }
    </>
  );
};

export default withRouter(Profile);
