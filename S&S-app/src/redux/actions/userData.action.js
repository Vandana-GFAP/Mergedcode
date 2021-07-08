import axios from 'axios';
import {
    SET_BALANCE_AND_LIMIT_DETAILS, SET_CURRENT_USER_CARD_LIST, SET_CURRENT_USER_CARD_HOTLIST_FREEZE, SET_CURRENT_USER_DETAIL, UPDATE_CURRENT_USER_DETAILS, SET_SELECTED_CARD_DETAILS
} from '../types';
import { apiKeys, dispatchAction, getLocalStorageItemValue } from "./index";
const { PROTOCOL, DNS_NAME, PORT } = JSON.parse(apiKeys);

export const updateCurrentUserData = ({ userData }) => {
    return async (dispatch) => {
        dispatch(dispatchAction({ type: UPDATE_CURRENT_USER_DETAILS, payload: { ...userData } }));
    }
}

export const setUserPassword = ({ pwdPayload }) => {
    return async () => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/setUserPassword?token=${token}`, pwdPayload);
    }
}

export const changeUserPassword = ({ pwdPayload }) => {
    return async () => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/changeUserPassword?token=${token}`, pwdPayload);
    }
}

export const resetMPIN = ({ payload }) => {
    return async () => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/resetMPIN?token=${token}`, payload);
    }
}

export const changeMPIN = ({ payload }) => {
    return async () => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/changeMPIN?token=${token}`, payload);
    }
}

export const getCurrentUserDetails = ({ payload }) => {
    return async (dispatch) => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/getCurrentUserDetails?token=${token}`, payload);
        const { appDetails, cardUserdet } = response.data;
        dispatch(dispatchAction({ type: SET_CURRENT_USER_DETAIL, payload: { ...cardUserdet, ...appDetails } }));
    }
}

export const getCardsList = ({ payload }) => {
    return async (dispatch) => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/getCardsList?token=${token}`, payload);
        console.log(response);
        dispatch(dispatchAction({ type: SET_CURRENT_USER_CARD_LIST, payload: response.data }));
    }
}

// export const getCardsBalance = ({ payload }) => {
//     return async (dispatch) => {
//         const token = getLocalStorageItemValue({ itemName: 'token' });
//         const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/getCardsBalance?token=${token}`, payload);
//         dispatch(dispatchAction({ type: SET_CURRENT_USER_CARDS_BALANCE, payload: { ...response.data } }));
//     }
// }

// export const getCardDetails = ({ payload }) => {
//     return async (dispatch) => {
//         const token = getLocalStorageItemValue({ itemName: 'token' });
//         const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/getCardDetails?token=${token}`, payload);
//         dispatch(dispatchAction({ type: SET_CURRENT_USER_CARD_DETAILS, payload: { ...response.data } }));
//     }
// }

// export const getCardBalance = ({ payload }) => {
//     return async (dispatch) => {
//         const token = getLocalStorageItemValue({ itemName: 'token' });
//         const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/getCardBalance?token=${token}`, payload);
//         dispatch(dispatchAction({ type: SET_CURRENT_USER_CARD_BALANCE, payload: { ...response.data } }));
//     }
// }

export const setCardHotlistAndFreeze = ({ payload }) => {
    return async (dispatch) => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/setCardHotlist?token=${token}`, payload);
        dispatch(dispatchAction({ type: SET_CURRENT_USER_CARD_HOTLIST_FREEZE, payload: { ...response.data } }));
    }
}

export const getCardBalanceAndLimitDetails = ({ payload }) => {
    return async (dispatch) => {
        const token = getLocalStorageItemValue({ itemName: 'token' });
        const response = await axios.post(`${PROTOCOL}//${DNS_NAME}:${PORT}/getCardBalanceAndLimitDetails?token=${token}`, payload);
        dispatch(dispatchAction({ type: SET_BALANCE_AND_LIMIT_DETAILS, payload: { ...response.data } }));
    }
}