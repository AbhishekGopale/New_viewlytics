import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  CreateLeavesData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CREATE_LEAVES_LOADING:
      return {
        ...state,
        isLoading: true,
        CreateLeavesData: {},
        error: "",
      };
    case ACTION.CREATE_LEAVES__SUCCESS:
      return {
        ...state,
        isLoading: false,
        CreateLeavesData: action.payload,
        error: "",
      };
    case ACTION.CREATE_LEAVES__FAILED:
      return {
        ...state,
        isLoading: false,
        CreateLeavesData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
