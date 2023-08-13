import React from "react";
import { Formik } from "formik";
import {
  ADD_TODO,
  BACKEND_URL,
  SET_EDITABLE_TOTO,
  SET_LOCAL_EDITED,
} from "../utils/Constant";
import { useGlobalContext } from "../contexts/GlobalContext";

const TodoAdder = () => {
  const { dispatch, editableTodo } = useGlobalContext();
  const handleEdit = async (e, editedText) => {
    e.preventDefault();
    console.log("edit clicked", editedText);
    const result = await fetch(
      `${BACKEND_URL}/todo/update_todo/${editableTodo._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ item: editedText }),
      }
    );
    console.log("result = ", result);
    const json = await result.json();
    console.log("json = ", json);
    dispatch({
      type: SET_LOCAL_EDITED,
      payload: { item: editedText, id: json._id },
    });
    dispatch({ type: SET_EDITABLE_TOTO, payload: null });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    console.log("cancel clicked");
    dispatch({ type: SET_EDITABLE_TOTO, payload: null });
  };
  return (
    <div className="todo_adder_container">
      <h2>Todo</h2>
      <Formik
        className="formik"
        initialValues={{ todo: `${editableTodo ? editableTodo.item : ""}` }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (values.todo.length > 30) {
            errors.todo = "letters must be less than 30";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const token = localStorage.getItem("token");
          console.log(token);
          const result = await fetch(`${BACKEND_URL}/todo/create`, {
            method: "POST",
            body: JSON.stringify({ item: values.todo }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(result);
          const json = await result.json();
          console.log(json);
          dispatch({ type: ADD_TODO, payload: json });
          values.todo = "";
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="formik" onSubmit={handleSubmit}>
            <input
              className="formik_input"
              type="text"
              name="todo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.todo}
            />
            <div className="length_error">{errors.todo}</div>
            {editableTodo ? (
              <div className="formik_edit_cancel">
                <button
                  className="edit"
                  onClick={(e) => handleEdit(e, values.todo)}
                >
                  Edit
                </button>
                <button className="cancel" onClick={(e) => handleCancel(e)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="formik_submit"
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </button>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default TodoAdder;
