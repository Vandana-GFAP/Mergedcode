import axios from 'axios';
import { SET_CONFIRM_OTP_RESPONSE, SET_LOGIN_RESPONSE, SET_OTP_RESPONSE } from '../types';
import { apiKeys, dispatchAction, setLocalStorageItemValue } from "./index";
import { setUserToken } from './util.action';

const { PROTOCOL, DNS_NAME, PORT } = JSON.parse(apiKeys);

export const getOTPForUser = ({ otpPayload }) => {
    return async (dispatch) => {
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/getOTPForUser`, otpPayload);
        dispatch(dispatchAction({ type: SET_OTP_RESPONSE, payload: { ...response.data } }));
    }
}

export const confirmOTPForUser = ({ otpPayload }) => {
    return async (dispatch) => {
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/confirmOTPForUser`, otpPayload);
        const { data, headers } = response.data;
        dispatch(dispatchAction({ type: SET_CONFIRM_OTP_RESPONSE, payload: { ...data } }));
        dispatch(setUserToken({ token: headers.token }));
        setLocalStorageItemValue({ itemName: 'mobile', itemValue: otpPayload.mobile });
    }
}

export const loginWithMobileAndPassword = ({ loginPayload }) => {
    return async (dispatch) => {
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/loginWithMobileAndPassword`, loginPayload);
        const { data, headers } = response.data;
        dispatch(dispatchAction({ type: SET_LOGIN_RESPONSE, payload: { ...data } }));
        dispatch(setUserToken({ token: headers.token }));
        setLocalStorageItemValue({ itemName: 'mobile', itemValue: loginPayload.mobile });

    }
}