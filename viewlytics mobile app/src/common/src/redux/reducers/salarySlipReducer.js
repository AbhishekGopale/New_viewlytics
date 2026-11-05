import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  SalarySlipData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SALARY_SLIP_LOADING:
      return {
        ...state,
        isLoading: true,
        SalarySlipData: {},
        error: "",
      };
    case ACTION.SALARY_SLIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        SalarySlipData: action.payload,
        error: "",
      };
    case ACTION.SALARY_SLIP_FAILED:
      return {
        ...state,
        isLoading: false,
        SalarySlipData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
