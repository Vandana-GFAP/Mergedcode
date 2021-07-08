import { SET_CONFIRM_OTP_RESPONSE, SET_LOGIN_RESPONSE, SET_OTP_RESPONSE } from "../types/index";

const initialState = {
    OTPResponse: {},
    confirmOTPResponse: {},
    loginResponse: {}
};

const loginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_OTP_RESPONSE: return { ...state, OTPResponse: payload };
        case SET_CONFIRM_OTP_RESPONSE: return { ...state, confirmOTPResponse: payload };
        case SET_LOGIN_RESPONSE: return { ...state, loginResponse: payload };
        default: return state;
    }
};
export default loginReducer;
