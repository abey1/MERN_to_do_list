import React, { useState } from "react";
import TodoList from "./TodoList";
import TodoAdder from "./TodoAdder";

const Tab = () => {
  const [showList, setShowList] = useState(true);

  return (
    <div className="tab">
      <div className="tab_header">
        <div className="tab_holder">
          <h2
            style={{ textDecoration: `${showList ? "underline" : ""}` }}
            className="tab_item"
            onClick={() => {
              setShowList(true);
            }}
          >
            List
          </h2>
        </div>
        <div className="tab_holder">
          <h2
            style={{ textDecoration: `${!showList ? "underline" : ""}` }}
            className="tab_item"
            onClick={() => {
              setShowList(false);
            }}
          >
            Adder
          </h2>
        </div>
      </div>
      <div className="tab_body">{showList ? <TodoList /> : <TodoAdder />}</div>
    </div>
  );
};

export default Tab;
