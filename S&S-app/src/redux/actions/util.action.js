import axios from 'axios';
import {
    SET_MINI_STATEMENT, SET_CURRENT_USER_MOBILE_NUMBER, SET_CURRENT_USER_TOKEN, UPDATE_NOTIFICATION_ALLOWED, UPDATE_USER_KYC
} from '../types';

import { apiKeys, dispatchAction, getLocalStorageItemValue, setLocalStorageItemValue } from "./index";
const { PROTOCOL, DNS_NAME, PORT } = JSON.parse(apiKeys);

export const setUserToken = ({ token }) => {
    return async (dispatch) => {
        setLocalStorageItemValue({ itemName: 'token', itemValue: token });
        dispatch(dispatchAction({ type: SET_CURRENT_USER_TOKEN, payload: token }));
    }
}

export const setUserMobileNumber = ({ mobileNumber }) => {
    return async (dispatch) => {
        dispatch(dispatchAction({ type: SET_CURRENT_USER_MOBILE_NUMBER, payload: mobileNumber }));
    }
}

export const getMiniStatement = ({ payload }) => {
    return async (dispatch) => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/getMiniStatement?token=${token}`, payload);
        dispatch(dispatchAction({ type: SET_MINI_STATEMENT, payload: { ...response.data } }));
    }
}

export const updateEmailID = ({ payload }) => {
    return async () => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/updateEmailID?token=${token}`, payload);
    }
}

export const updateAppLanguage = ({ payload }) => {
    return async () => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/updateAppLanguage?token=${token}`, payload);
    }
}

export const updateNotificationAllowed = ({ payload }) => {
    return async (dispatch) => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/updateNotificationAllowed?token=${token}`, payload);
        dispatch(dispatchAction({ type: UPDATE_NOTIFICATION_ALLOWED, payload: { ...response.data } }));
    }
}

export const updateKYC = ({ payload }) => {
    return async (dispatch) => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/updateUserKYC?token=${token}`, payload);
        dispatch(dispatchAction({ type: UPDATE_USER_KYC, payload: { ...response.data } }));
    }
}

