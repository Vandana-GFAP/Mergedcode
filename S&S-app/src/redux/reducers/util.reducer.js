import {
    SET_MINI_STATEMENT, SET_CURRENT_USER_MOBILE_NUMBER, SET_CURRENT_USER_TOKEN, UPDATE_NOTIFICATION_ALLOWED, UPDATE_USER_KYC
} from '../types';

const initialState = {
    userToken: {},
    userMobileNumber: "",
    miniStatementResponse: {}
};

const utilReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_CURRENT_USER_TOKEN: return { ...state, userToken: payload };
        case SET_CURRENT_USER_MOBILE_NUMBER: return { ...state, userMobileNumber: payload };
        case SET_MINI_STATEMENT: return { ...state, miniStatementResponse: payload };
        case UPDATE_NOTIFICATION_ALLOWED: return { ...state, userMobileNumber: payload };
        case UPDATE_USER_KYC: return { ...state, userMobileNumber: payload };
        default: return state;
    }
};
export default utilReducer;
