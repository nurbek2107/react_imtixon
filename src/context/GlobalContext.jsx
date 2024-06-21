import { createContext, useEffect, useReducer, useState } from "react";
import { produce } from "immer";

export const GlobalContext = createContext();

function stateFromLocalStorage() {
  return (
    JSON.parse(localStorage.getItem("mystore")) || {
      user: null,
      products: [],
      total: 0,
      totalPrice: 0,
      isAuthChange: false,
    }
  );
}

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOG_IN":
      return { ...state, user: payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "AUTH_CHANGE":
      return { ...state, isAuthChange: true };
    case "ADD_PRODUCT":
      return { ...state, products: payload };
    case "CHANGE_TOTAL":
      return { ...state, total: payload };
    case "CHANGE_TOTAL_PRICE":
      return { ...state, totalPrice: payload };
    default:
      return state;
  }
};

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, stateFromLocalStorage());
  console.log(state);
  // add selected product
  const addProduct = (prod) => {
    if (state.products.find((product) => product.id == prod.id)) {
      function toggleTodo(state, prod) {
        return produce(state, (draft) => {
          const product = draft.products.find((item) => item.id === prod.id);
          product.amount = product.amount + prod.amount;
        });
      }

      const result = toggleTodo(state, prod);
      dispatch({ type: "ADD_PRODUCT", payload: result.products });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: [...state.products, prod] });
    }
  };

  //delete product
  const deleteProduct = (id) => {
    const deletedProducts = state.products.filter(
      (product) => product.id !== id
    );

    dispatch({ type: "ADD_PRODUCT", payload: deletedProducts });
  };

  const increaseAmount = (id) => {
    function toggleItem(state, id) {
      return produce(state, (draft) => {
        const product = draft.products.find((item) => item.id === id);
        product.amount = product.amount + 1;
      });
    }

    const result = toggleItem(state, id);
    dispatch({ type: "ADD_PRODUCT", payload: result.products });
  };

  const decreaseAmount = (id) => {
    function toggleItem(state, id) {
      return produce(state, (draft) => {
        const product = draft.products.find((item) => item.id === id);
        product.amount = product.amount - 1;
      });
    }

    const result = toggleItem(state, id);
    dispatch({ type: "ADD_PRODUCT", payload: result.products });
  };

  //calculate
  function calculateTotal(id) {
    let counter = 0;
    let counterPrice = 0;
    state.products.forEach((item) => {
      counter += item.amount;
      counterPrice += item.price * item.amount;
    });

    dispatch({ type: "CHANGE_TOTAL", payload: counter });
    dispatch({ type: "CHANGE_TOTAL_PRICE", payload: counterPrice });
  }

  useEffect(() => {
    calculateTotal();
  }, [state.products]);

  useEffect(() => {
    localStorage.setItem("mystore", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
        addProduct,
        deleteProduct,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
