import {
    SET_BALANCE_AND_LIMIT_DETAILS, SET_CURRENT_USER_CARD_LIST, SET_CURRENT_USER_CARD_DETAILS, SET_CURRENT_USER_DETAIL, UPDATE_CURRENT_USER_DETAILS, SET_SELECTED_CARD_DETAILS, SET_CURRENT_USER_CARD_HOTLIST_FREEZE
} from '../types';

const initialState = {
    currentUserDetails: {},
    currentUserCardList: [],
    currentUserCardBalanceAndLimit: {},
    currentUserCardDetails: {},
    selectedCardDetails: {},
    cardFreezeHotlistResponse: {}
};

const userDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_CURRENT_USER_DETAILS: return { ...state, currentUserDetails: payload };
        case SET_CURRENT_USER_DETAIL: return { ...state, currentUserDetails: payload };
        case SET_CURRENT_USER_CARD_LIST: return { ...state, currentUserCardList: payload };
        case SET_BALANCE_AND_LIMIT_DETAILS: return { ...state, currentUserCardBalanceAndLimit: payload };
        case SET_CURRENT_USER_CARD_DETAILS: return { ...state, currentUserCardDetails: payload };
        case SET_SELECTED_CARD_DETAILS: return { ...state, selectedCardDetails: payload };
        case SET_CURRENT_USER_CARD_HOTLIST_FREEZE: return { ...state, cardFreezeHotlistResponse: payload };
        default: return state;
    }
};
export default userDataReducer;
