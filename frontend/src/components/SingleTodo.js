import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { SET_DELETEABLE_TODO, SET_EDITABLE_TOTO } from "../utils/Constant";
import Checked from "./Checked";
const SingleTodo = ({ todo }) => {
  const { dispatch } = useGlobalContext();
  const addEdiableTodo = () => {
    dispatch({ type: SET_EDITABLE_TOTO, payload: todo });
  };
  const addDeleableTodo = () => {
    dispatch({ type: SET_DELETEABLE_TODO, payload: todo });
  };
  return (
    <div className="single_todo_container">
      <Checked id={todo._id} />
      <div className="single_todo">
        <h3>{todo.item}</h3>
        <div className="todo_action_holder">
          <div className="btn-holder" onClick={addEdiableTodo}>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
          <div className="btn-holder" onClick={addDeleableTodo}>
            <i className="fa-solid fa-trash-can"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
