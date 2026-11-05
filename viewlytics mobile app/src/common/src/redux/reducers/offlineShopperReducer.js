import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflineShopperData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_SOPERENGAGEMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineShopperData: {},
        error: "",
      };
    case ACTION.OFFLINE_SOPERENGAGEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineShopperData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_SOPERENGAGEMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        OfflineShopperData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
