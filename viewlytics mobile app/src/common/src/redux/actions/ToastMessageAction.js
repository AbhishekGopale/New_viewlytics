import {
  TOAST_MESSAGE_CLEAR,
  TOAST_MESSAGE_FAILED,
  TOAST_MESSAGE_LOADING,
  TOAST_MESSAGE_SUCCESS,
} from "../types";

export const ToastMessage = (msg) => {
  return (dispatch) => {
    dispatch({
      type: TOAST_MESSAGE_LOADING,
    });
    try {
      dispatch({ type: TOAST_MESSAGE_SUCCESS, payload: msg });
      dispatch({ type: TOAST_MESSAGE_CLEAR, payload: "" });
    } catch (error) {
      dispatch({
        type: TOAST_MESSAGE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
