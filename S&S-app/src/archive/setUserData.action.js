import { SET_CURRENT_USER_DATA } from "../redux/types/index";
export const setCurrentUserData = (user_data) => {
  return {
    type: SET_CURRENT_USER_DATA,
    user_data,
  };
};
