import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  DahbordDetails: {},
  attendance: [],
  achieved: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.PROMOTER_TL_DASHBORD_LOADING:
      return {
        ...state,
        isLoading: true,
        DahbordDetails: {},
        attendance: [],
        achieved: [],
        error: "",
      };
    case ACTION.PROMOTER_TL_DASHBORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        DahbordDetails: action.payload.data,
        attendance: action.payload.attendance,
        achieved: action.payload.achieved,
        error: "",
      };
    case ACTION.PROMOTER_TL_DASHBORD_FAILED:
      return {
        ...state,
        isLoading: false,
        DahbordDetails: {},
        attendance: [],
        achieved: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
