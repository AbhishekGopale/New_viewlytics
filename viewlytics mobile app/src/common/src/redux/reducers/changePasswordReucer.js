import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  changePasswordStatus: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: true,
        changePasswordStatus: {},
        error: "",
      };
    case ACTION.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        changePasswordStatus: action.payload,
        error: "",
      };
    case ACTION.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
        changePasswordStatus: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
