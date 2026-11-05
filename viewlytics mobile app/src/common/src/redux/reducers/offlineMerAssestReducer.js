import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  MerAssestTrakingData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ASSEST_TRAKING_OFFLINE_LOADING:
      return {
        ...state,
        isLoading: true,
        MerAssestTrakingData: {},
        error: "",
      };
    case ACTION.ASSEST_TRAKING_OFFLINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        MerAssestTrakingData: action.payload,
        error: "",
      };
    case ACTION.ASSEST_TRAKING_OFFLINE_FAILED:
      return {
        ...state,
        isLoading: false,
        MerAssestTrakingData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
