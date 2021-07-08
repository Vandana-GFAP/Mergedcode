import * as types from "../types";
export const setUserData = (user_data) => {
  return {
    type: types.SET_USER_DATA,
    user_data,
  };
};
