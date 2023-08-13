import React, { useEffect } from "react";
import Tab from "../components/Tab";
import TodoAdder from "../components/TodoAdder";
import TodoList from "../components/TodoList";
import { useGlobalContext } from "../contexts/GlobalContext";
import {
  ADD_TODOS,
  BACKEND_URL,
  SET_DELETEABLE_TODO,
  SET_LOCAL_DELETED,
} from "../utils/Constant";
import { useAuthContext } from "../contexts/AuthContext";
import { LOGOUT } from "../utils/Constant";

const Home = () => {
  const { dispatch, deletableTodo } = useGlobalContext();
  const { authDispatch } = useAuthContext();
  const deleteTodo = async () => {
    const result = await fetch(
      `${BACKEND_URL}/todo/delete_todo/${deletableTodo._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const json = await result.json();
    console.log("json => ", json);
    if (json.error) {
      authDispatch({ type: LOGOUT });
    } else {
      dispatch({ type: SET_DELETEABLE_TODO, payload: null });
      dispatch({ type: SET_LOCAL_DELETED, payload: { id: deletableTodo._id } });
    }
  };
  const cancelDelete = () => {
    dispatch({ type: SET_DELETEABLE_TODO, payload: null });
  };
  useEffect(() => {
    const getTodos = async () => {
      const result = await fetch(`${BACKEND_URL}/todo/get_todos/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await result.json();
      console.log("result = ", result);
      console.log("josn ==> ", json);
      dispatch({ type: ADD_TODOS, payload: json });
    };
    // return () => getTodos();
    getTodos();
  }, []);
  return (
    <div>
      <div className="home_1">
        <TodoList />
        <TodoAdder />
      </div>
      <div className="home_2">
        <Tab />
      </div>
      {deletableTodo && (
        <div className="confirm_delete">
          <div className="confirm_delete_card">
            <h4>Are you sure you want to delete : {deletableTodo.item}</h4>
            <div className="confirm_delete_button_holder">
              <button className="yes" onClick={deleteTodo}>
                yes
              </button>
              <button className="no" onClick={cancelDelete}>
                no
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
