import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  storeList: [],
  notVerifiedStore: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.MERSTORE_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        storeList: [],
        notVerifiedStore: {},
        error: "",
      };
    case ACTION.MERSTORE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        storeList: action.payload.allStore,
        notVerifiedStore: action.payload.notVerified,
        error: "",
      };
    case ACTION.MERSTORE_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        storeList: [],
        notVerifiedStore: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
