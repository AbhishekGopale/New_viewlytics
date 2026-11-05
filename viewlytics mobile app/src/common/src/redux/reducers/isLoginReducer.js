import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  isLogin: false,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ISLOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
        isLogin: false,
        error: "",
      };
    case ACTION.ISLOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogin: action.payload,
        error: "",
      };
    case ACTION.ISLOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
