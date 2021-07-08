import * as types from "../redux/types";
export const updateUserData = (payload) => {
  return {
    type: types.UPDATE_CURRENT_USER_DETAILS,
    user_data: payload,
  };
};
