import React from "react";
import checked from "../assets/checked.png";
import unchecked from "../assets/unchecked.png";
import { useGlobalContext } from "../contexts/GlobalContext";
import { ADD_CHECKED_TODO } from "../utils/Constant";
const Checked = (id) => {
  const { dispatch, checkedList } = useGlobalContext();
  const handleChecked = () => {
    dispatch({ type: ADD_CHECKED_TODO, payload: id });
  };
  return (
    <div>
      <img
        className="checked_box"
        src={
          checkedList.some(
            (elem) => JSON.stringify(id) === JSON.stringify(elem)
          )
            ? checked
            : unchecked
        }
        alt="checked and unchecked check box"
        onClick={handleChecked}
      />
    </div>
  );
};

export default Checked;
