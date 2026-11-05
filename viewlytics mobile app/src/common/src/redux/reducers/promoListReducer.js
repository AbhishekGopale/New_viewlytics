import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  promoList: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.PROMO_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        promoList: {},
        error: "",
      };
    case ACTION.PROMO_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        promoList: action.payload,
        error: "",
      };
    case ACTION.PROMO_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        promoList: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
