import { useContext, createContext, useReducer } from "react";
import {
  ADD_TODO,
  UPDATE_TOTO,
  DELETE_TODO,
  ADD_TODOS,
  SET_EDITABLE_TOTO,
  SET_DELETEABLE_TODO,
  SET_LOCAL_EDITED,
  SET_LOCAL_DELETED,
  ADD_CHECKED_TODO,
  ADD_ALL_TODO,
  DELETE_ALL_TODO,
} from "../utils/Constant";
const GlobalContext = createContext();

const initialState = {
  todos: [],
  editableTodo: null,
  deletableTodo: null,
  checkedList: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO: {
      var found = false;
      for (var i = 0; i < state.todos.length; i++) {
        if (state.todos[i]._id === action.payload._id) {
          found = true;
          break;
        }
      }
      !found && state.todos.push(action.payload);
      return { ...state };
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
    case SET_EDITABLE_TOTO: {
      console.log(action.payload);
      return { ...state, editableTodo: action.payload };
    }
    case SET_DELETEABLE_TODO: {
      return { ...state, deletableTodo: action.payload };
    }
    case SET_LOCAL_EDITED: {
      const newTodos = state.todos.map((todo, index) => {
        return todo._id === action.payload.id
          ? { ...todo, item: action.payload.item }
          : todo;
      });
      return { ...state, todos: newTodos };
    }
    case SET_LOCAL_DELETED: {
      const newTodos = state.todos.filter(
        (todo, index) => todo._id !== action.payload.id
      );
      return { ...state, todos: newTodos };
    }
    case ADD_CHECKED_TODO: {
      // if the id is already in checked list
      const newCheckedList = state.checkedList.some(
        (elem) => JSON.stringify(elem) === JSON.stringify(action.payload)
      )
        ? // remove it using filter
          state.checkedList.filter(
            (elem) => JSON.stringify(elem) !== JSON.stringify(action.payload)
          )
        : // otherwise add it to checkedlist
          [...state.checkedList, action.payload];
      console.log(newCheckedList);
      return { ...state, checkedList: newCheckedList };
    }
    case ADD_ALL_TODO: {
      // if all the todos are included in the checkedlist make it empty
      if (state.todos.length === state.checkedList.length) {
        return { ...state, checkedList: [] };
      } else {
        // else add all of them inside the checked list
        var newCheckedList = [];
        state.todos.map((todo, index) => {
          !newCheckedList.some(
            (elem) => JSON.stringify(elem) === JSON.stringify({ id: todo._id })
          ) && newCheckedList.push({ id: todo._id });
        });
        console.log(newCheckedList);
        return { ...state, checkedList: newCheckedList };
      }
    }
    case DELETE_ALL_TODO: {
      console.log("checked list => ", state.checkedList);
      console.log("todos => ", state.todos);
      const includesModefic = (id) => {
        var status = false;
        for (var i = 0; i < state.checkedList.length; i++) {
          if (state.checkedList[i].id === id) {
            status = true;
            break;
          }
        }
        return status;
      };
      const newTodos = state.todos.filter((todo) => !includesModefic(todo._id));
      return { ...state, todos: newTodos };
      // return { ...state, todos: newTodos };
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
