import {
  ERROR_API_FAILED,
  ERROR_API_LOADING,
  ERROR_API_SUCCESS,
} from "../types";

export const ErrorAction = (isError, errorMsg) => {
  console.log("isErrorAction", isError);
  return (dispatch) => {
    dispatch({
      type: ERROR_API_LOADING,
    });
    try {
      dispatch({
        type: ERROR_API_SUCCESS,
        payload: { error: isError, msg: errorMsg },
      });
    } catch (error) {
      dispatch({
        type: ERROR_API_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
