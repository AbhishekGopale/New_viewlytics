import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  CreateCompetionData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CREATE_COMPETITION_LOADING:
      return {
        ...state,
        isLoading: true,
        CreateCompetionData: {},
        error: "",
      };
    case ACTION.CREATE_COMPETITION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        CreateCompetionData: action.payload,
        error: "",
      };
    case ACTION.CREATE_COMPETITION_FAILED:
      return {
        ...state,
        isLoading: false,
        CreateCompetionData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
