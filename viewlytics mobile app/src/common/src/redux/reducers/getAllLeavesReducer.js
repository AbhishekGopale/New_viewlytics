import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  allLeaves: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_ALL_LEAVES_LOADING:
      return {
        ...state,
        isLoading: true,
        allLeaves: {},
        error: "",
      };
    case ACTION.GET_ALL_LEAVES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allLeaves: action.payload,
        error: "",
      };
    case ACTION.GET_ALL_LEAVES_FAILED:
      return {
        ...state,
        isLoading: false,
        allLeaves: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
