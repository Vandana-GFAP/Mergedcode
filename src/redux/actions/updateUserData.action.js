import * as types from "../types";
export const updateUserData = (payload) => {
  return {
    type: types.UPDATE_USER_DATA,
    user_data: payload,
  };
};
