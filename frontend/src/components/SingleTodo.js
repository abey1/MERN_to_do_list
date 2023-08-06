import React from "react";

const SingleTodo = ({ item }) => {
  return (
    <div className="single_todo">
      <h3>{item}</h3>
      <div className="todo_action_holder">
        <div className="btn-holder">
          <i class="fa-solid fa-pen-to-square"></i>
        </div>
        <div className="btn-holder">
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
