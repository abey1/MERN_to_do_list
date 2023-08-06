import React, { useEffect } from "react";
import Tab from "../components/Tab";
import TodoAdder from "../components/TodoAdder";
import TodoList from "../components/TodoList";
import { useGlobalContext } from "../contexts/GlobalContext";
import { ADD_TODOS } from "../utils/Constant";

const Home = () => {
  const { dispatch } = useGlobalContext();
  useEffect(() => {
    dispatch({
      type: ADD_TODOS,
      payload: [
        { item: "todo 1" },
        { item: "todo 2" },
        { item: "todo 3" },
        { item: "todo 4" },
        { item: "todo 5" },
        { item: "todo 6" },
      ],
    });
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
    </div>
  );
};

export default Home;
