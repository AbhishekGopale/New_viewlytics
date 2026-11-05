import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflinePromoData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_PROMO_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflinePromoData: {},
        error: "",
      };
    case ACTION.OFFLINE_PROMO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflinePromoData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_PROMO_FAILED:
      return {
        ...state,
        isLoading: false,
        OfflinePromoData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
