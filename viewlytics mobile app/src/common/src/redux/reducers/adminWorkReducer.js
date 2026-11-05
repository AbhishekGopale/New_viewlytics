import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  AdminWorkData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ADMIN_WORK_LOADING:
      return {
        ...state,
        isLoading: true,
        AdminWorkData: {},
        error: "",
      };
    case ACTION.ADMIN_WORK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        AdminWorkData: action.payload,
        error: "",
      };
    case ACTION.ADMIN_WORK_FAILED:
      return {
        ...state,
        isLoading: false,
       AdminWorkData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
