import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflineAdminWorkData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_ADMINWORK_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineAdminWorkData: {},
        error: "",
      };
    case ACTION.OFFLINE_ADMINWORK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineAdminWorkData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_ADMINWORK_FAILED:
      return {
        ...state,
        isLoading: false,
        OfflineAdminWorkData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
