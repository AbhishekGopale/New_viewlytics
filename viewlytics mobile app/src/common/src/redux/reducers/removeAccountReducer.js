import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  removeAccountData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.REMOVE_ACCOUNT_LOADING:
      return {
        ...state,
        isLoading: true,
        removeAccountData: {},
        error: "",
      };
    case ACTION.REMOVE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        removeAccountData: action.payload,
        error: "",
      };
    case ACTION.REMOVE_ACCOUNT_FAILED:
      return {
        ...state,
        isLoading: false,
        removeAccountData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
