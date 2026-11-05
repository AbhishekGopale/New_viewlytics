import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  PromoUpdateData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.PROMO_UPDATE_LOADING:
      return {
        ...state,
        isLoading: true,
        PromoUpdateData: {},
        error: "",
      };
    case ACTION.PROMO_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        PromoUpdateData: action.payload,
        error: "",
      };
    case ACTION.PROMO_UPDATE_FAILED:
      return {
        ...state,
        isLoading: false,
        PromoUpdateData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
