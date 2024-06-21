import { useState, useEffect, useReducer } from "react";

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "IS_PENDING":
      return { ...state, isPending: payload };
    case "SET_DATA":
      return { ...state, data: payload };
    case "SET_ERROR":
      return { ...state, error: payload };
    default:
      return state;
  }
};

function useFetch(url) {
  const [state, dispatch] = useReducer(changeState, {
    data: null,
    isPending: false,
    error: null,
  });

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: "IS_PENDING", payload: true });
      try {
        const request = await fetch(url);

        if (!request.ok) {
          throw new Error("Something went wrong :(");
        }

        const response = await request.json();
        dispatch({ type: "SET_DATA", payload: response });
        dispatch({ type: "IS_PENDING", payload: false });
        dispatch({ type: "SET_ERROR", payload: null });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "IS_PENDING", payload: false });
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    getData();
  }, [url]);

  return { ...state };
}

export { useFetch };
