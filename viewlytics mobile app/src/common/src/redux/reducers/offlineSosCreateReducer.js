import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflineSosData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_SOS_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineSosData: {},
        error: "",
      };
    case ACTION.OFFLINE_SOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineSosData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_SOS_LOADING:
      return {
        ...state,
        isLoading: false,
        OfflineSosData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
