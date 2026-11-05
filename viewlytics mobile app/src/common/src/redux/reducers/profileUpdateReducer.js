import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  ProfileImageData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.PROFILE_UPDATE_LOADING:
      return {
        ...state,
        isLoading: true,
        ProfileImageData: {},
        error: "",
      };
    case ACTION.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ProfileImageData: action.payload,
        error: "",
      };
    case ACTION.PROFILE_UPDATE_CLEAR:
      return {
        ...state,
        isLoading: false,
        ProfileImageData: {},
        error: "",
      };
    case ACTION.PROFILE_UPDATE_FAILED:
      return {
        ...state,
        isLoading: false,
        ProfileImageData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
