import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  myProfileData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.MY_PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
        myProfileData: {},
        error: "",
      };
    case ACTION.MY_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myProfileData: action.payload,
        error: "",
      };
    case ACTION.MY_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
        myProfileData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
