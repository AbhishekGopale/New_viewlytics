import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  ShopperEngagemnetData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SHOPPER_ENGAGEMNET_LOADING:
      return {
        ...state,
        isLoading: true,
        ShopperEngagemnetData: {},
        error: "",
      };
    case ACTION.SHOPPER_ENGAGEMNET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ShopperEngagemnetData: action.payload,
        error: "",
      };
    case ACTION.SHOPPER_ENGAGEMNET_FAILED:
      return {
        ...state,
        isLoading: false,
        ShopperEngagemnetData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
