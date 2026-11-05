import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  SalesHealthData: {},
  Target: [],
  Achieved: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SALES_HEALTH_LOADING:
      return {
        ...state,
        isLoading: true,
        SalesHealthData: {},
        Target: [],
        Achieved: [],
        error: "",
      };
    case ACTION.SALES_HEALTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        SalesHealthData: action.payload.data,
        Target: action.payload.target,
        Achieved: action.payload.achieved,
        error: "",
      };
    case ACTION.SALES_HEALTH_FAILED:
      return {
        ...state,
        isLoading: false,
        SalesHealthData: {},
        Target: [],
        Achieved: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
