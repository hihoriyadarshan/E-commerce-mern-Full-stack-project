import axios from "axios";

import{ ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS} from "../constants/productConstants";
// import{ CLEAR_ERRORS} from "../constants/productConstants";
// import { useDispatch } from "react-redux";

// productAction.js
export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/products");

    console.log("API Response Data:", data);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("API Request Error:", error);

    // Log the full error object to see its structure
    console.log("Full Error Object:", error);

    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.message || "An error occurred",
    });
  }
};

  //clearing Errors
//   export const clearError = () => async(dispatch)=>{
//   dispatch({ type: CLEAR_ERRORS });
//   }  