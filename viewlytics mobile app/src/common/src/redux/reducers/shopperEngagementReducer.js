import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  ShopperEngagementData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SHOPPER_ENGAGEMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        ShopperEngagementData: {},
        error: "",
      };
    case ACTION.SHOPPER_ENGAGEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ShopperEngagementData: action.payload,
        error: "",
      };
    case ACTION.SHOPPER_ENGAGEMNET_FAILED:
      return {
        ...state,
        isLoading: false,
        ShopperEngagementData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
