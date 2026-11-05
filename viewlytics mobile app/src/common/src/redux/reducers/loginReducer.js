import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  loginData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
        loginData: {},
        error: "",
      };
    case ACTION.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loginData: action.payload,
        error: "",
      };
    case ACTION.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        loginData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
