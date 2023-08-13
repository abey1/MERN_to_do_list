import React from "react";
import SingleTodo from "./SingleTodo";
import { useGlobalContext } from "../contexts/GlobalContext";
import CheckedAll from "./CheckedAll";
import { BACKEND_URL, DELETE_ALL_TODO } from "../utils/Constant";

const TodoList = () => {
  const { dispatch, todos, checkedList } = useGlobalContext();
  const handleDeleteAll = async () => {
    const result = await fetch(`${BACKEND_URL}/todo/delete_all`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ todos: checkedList }),
    });
    console.log(result);
    const json = await result.json();
    console.log("delete all => ", json);
    dispatch({ type: DELETE_ALL_TODO });
  };
  return (
    <>
      {todos.length === 0 ? (
        <div className="empty_todo_list_container">
          <h4>your todo list will appear here</h4>
        </div>
      ) : (
        <div className="todos_container">
          <div className="delete_all_button_container">
            <CheckedAll />
            <button
              className="delete_all_button"
              disabled={checkedList.length === 0}
              style={{
                backgroundColor: `${
                  checkedList.length === 0 ? "#ccc" : "#d9534f"
                }`,
                color: `${checkedList.length === 0 ? "#000" : "#fff"}`,
              }}
              onClick={handleDeleteAll}
            >
              Delete
            </button>
          </div>
          {todos &&
            todos.map((todo, index) => {
              return <SingleTodo key={index} todo={todo} />;
            })}
        </div>
      )}
    </>
  );
};

export default TodoList;
