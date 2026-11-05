import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  allDetails: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ABSENT_EMPLOYEE_LOADING:
      return {
        ...state,
        isLoading: true,
        allDetails: {},
        error: "",
      };
    case ACTION.ABSENT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allDetails :action.payload,
        error: "",
      };
    case ACTION.ABSENT_EMPLOYEE_FAILED:
      return {
        ...state,
        isLoading: false,
        allDetails: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
