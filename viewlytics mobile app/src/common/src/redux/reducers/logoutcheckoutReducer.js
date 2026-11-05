import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  LogoutCheckoutData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.LOGOUT_CHECKOUT_LOADING:
      return {
        ...state,
        isLoading: true,
        LogoutCheckoutData: {},
        error: "",
      };
    case ACTION.LOGOUT_CHECKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        LogoutCheckoutData: action.payload,
        error: "",
      };
    case ACTION.LOGOUT_CHECKOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        LogoutCheckoutData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
