import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  MapCreateData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.MAP_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        MapCreateData: {},
        error: "",
      };
    case ACTION.MAP_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        MapCreateData: action.payload,
        error: "",
      };
    case ACTION.MAP_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        MapCreateData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
