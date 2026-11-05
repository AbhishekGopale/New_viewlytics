import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  VerifiedStoreData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.VERIFIED_STORE_DETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
        VerifiedStoreData: {},
        error: "",
      };
    case ACTION.VERIFIED_STORE_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        VerifiedStoreData: action.payload,
        error: "",
      };
    case ACTION.VERIFIED_STORE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        VerifiedStoreData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
