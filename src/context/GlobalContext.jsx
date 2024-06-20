import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext(createContext);

const changeState = (state, action) => {
  const { type, payload} = action
  switch (type) {
    case "LOG_IN":
      return {...state, user:payload,  };
    case "LOG_OUT":
      return {...state, user: null};  
      case "AUTH_CHANGE":
        return {...state, isAuthChange: true}
      
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(changeState,{
    user:null,
    product:[],
    total: 10,
    isAuthChange: false
  })

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext };
