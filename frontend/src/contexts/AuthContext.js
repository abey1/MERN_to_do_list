import { createContext, useContext, useReducer } from "react";
import { LOGIN, LOGOUT } from "../utils/Constant";

const AuthContext = createContext();

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, user: action.payload };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return { ...state, user: null };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, authDispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
