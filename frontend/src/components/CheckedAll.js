import React from "react";
import checked from "../assets/checked.png";
import unchecked from "../assets/unchecked.png";
import { useGlobalContext } from "../contexts/GlobalContext";
import { ADD_ALL_TODO } from "../utils/Constant";

const CheckedAll = () => {
  const { dispatch, todos, checkedList } = useGlobalContext();
  const handleCheckAll = () => {
    dispatch({ type: ADD_ALL_TODO });
  };
  return (
    <div>
      <img
        className="checked_all_box"
        src={todos.length === checkedList.length ? checked : unchecked}
        alt="checked and unchecked check box"
        onClick={handleCheckAll}
      />
    </div>
  );
};

export default CheckedAll;
