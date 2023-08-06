import React from "react";
import { Formik } from "formik";

const TodoAdder = () => {
  return (
    <div className="todo_adder_container">
      <h2>Todo</h2>
      <Formik
        className="formik"
        initialValues={{ todo: "" }}
        validate={(values) => {
          const errors = {};
          if (values.todo.length > 30) {
            errors.todo = "letters must be less than 30";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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

            <button
              className="formik_submit"
              type="submit"
              disabled={isSubmitting}
            >
              Add
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default TodoAdder;
