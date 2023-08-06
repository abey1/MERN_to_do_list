import { useContext, createContext, useReducer } from "react";
import {
  ADD_TODO,
  UPDATE_TOTO,
  DELETE_TODO,
  ADD_TODOS,
} from "../utils/Constant";
const GlobalContext = createContext();

const initialState = {
  todos: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return state;
    }
    case UPDATE_TOTO: {
      return state;
    }
    case DELETE_TODO: {
      return state;
    }
    case ADD_TODOS: {
      return { ...state, todos: action.payload };
    }
    default:
      return state;
  }
};
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
