import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  storeList: [],
  notVerifiedStore: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.STORE_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        storeList: [],
        notVerifiedStore: {},
        error: "",
      };
    case ACTION.STORE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        storeList: action.payload.allStore,
        notVerifiedStore: action.payload.notVerified,
        error: "",
      };
    case ACTION.SALARY_SLIP_FAILED:
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
