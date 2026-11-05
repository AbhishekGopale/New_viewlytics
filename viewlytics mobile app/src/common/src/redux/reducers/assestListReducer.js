import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  allAsset: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ASSET_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        allAsset: {},
        error: "",
      };
    case ACTION.ASSET_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAsset: action.payload,
        error: "",
      };
    case ACTION.ASSET_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        allAsset: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
