import React from "react";
import SingleTodo from "./SingleTodo";
import { useGlobalContext } from "../contexts/GlobalContext";

const TodoList = () => {
  const { todos } = useGlobalContext();
  return (
    <div className="todos_container">
      {todos &&
        todos.map((todo, index) => {
          return <SingleTodo key={index} item={todo.item} />;
        })}
    </div>
  );
};

export default TodoList;
