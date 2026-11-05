import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  MerDahbordDetails: {},
  attendance: [],
  pjp: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.MER_DASHBORD_LOADING:
      return {
        ...state,
        isLoading: true,
        MerDahbordDetails: {},
        pjp: [],
        attendance: [],
        error: "",
      };
    case ACTION.MER_DASHBORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        MerDahbordDetails: action.payload.data,
        pjp: action.payload.pjp,
        attendance: action.payload.attendance,
        error: "",
      };
    case ACTION.MER_DASHBORD_FAILED:
      return {
        ...state,
        isLoading: false,
        MerDahbordDetails: {},
        pjp: [],
        attendance: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
