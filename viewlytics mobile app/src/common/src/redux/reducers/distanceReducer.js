import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  distanceDetails: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.DISTANCE_DIGIT_LOADING:
      return {
        ...state,
        isLoading: true,
        distanceDetails: {},
        error: "",
      };
    case ACTION.DISTANCE_DIGIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        distanceDetails: action.payload,
        error: "",
      };
    case ACTION.DISTANCE_DIGIT_FAILED:
      return {
        ...state,
        isLoading: false,
        distanceDetails: {},

        error: action.payload,
      };
    default:
      return state;
  }
}
