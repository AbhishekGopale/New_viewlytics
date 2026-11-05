import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  formDisableData: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.FORM_DISABLE_LOADING:
      return {
        ...state,
        isLoading: true,
        formDisableData: [],
        error: "",
      };
    case ACTION.FORM_DISABLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        formDisableData: action.payload,
        error: "",
      };
    case ACTION.FORM_DISABLE_FAILED:
      return {
        ...state,
        isLoading: false,
        formDisableData: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
