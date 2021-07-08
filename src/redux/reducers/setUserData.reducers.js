import * as types from "../types";
const initialState = {};

const setUserDataReducer = (state = initialState, { type, user_data }) => {
  switch (type) {
    case types.SET_USER_DATA:
      return user_data;
    case types.UPDATE_USER_DATA:
      if (user_data?.name) {
        const data = {
          name: user_data?.name || "",
          email: user_data?.email || "",
          phone: user_data?.phone || "",
          ova_id: user_data?.ova_id || "",
          username: user_data?.username || "",
          location: user_data?.location || "",
          profile_picture: user_data?.profile_picture || "",
          isKycVerified: user_data?.isKycVerified || false,
        };
        return { ...data };
      } else {
        return initialState;
      }
    default:
      return state;
  }
};
export default setUserDataReducer;
