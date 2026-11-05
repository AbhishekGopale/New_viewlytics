import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  IsCheckInDetailsData:false,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.IS_CHECKIN_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        IsCheckInDetailsData: false,
        error: "",
      };
    case ACTION.IS_CHECKIN_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        IsCheckInDetailsData: true,
        error: "",
      };
    case ACTION.IS_CHECKIN_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        IsCheckInDetailsData:false,
        error: action.payload,
      };
    default:
      return state;
  }
}
