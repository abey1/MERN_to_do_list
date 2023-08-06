import React, { useState } from "react";
import { Formik } from "formik";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="signup_container">
      <div className="signup">
        <h2>Signup</h2>
        <Formik
          initialValues={{ email: "", password: "", confirm_password: "" }}
          validate={(values) => {
            const errors = {};
            if (values.password !== values.confirm_password) {
              errors.confirm_password = "Password is not matching";
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
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="password_container">
                <input
                  className="formik_input"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="show_hide_holder">
                  <div
                    className="btn-holder"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      class={`fa-solid ${
                        showPassword ? "fa-eye-low-vision" : "fa-eye"
                      }`}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="password_container">
                <input
                  className="formik_input"
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  name="confirm_password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
                />
                <div className="show_hide_holder">
                  <div
                    className="btn-holder"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      class={`fa-solid ${
                        showConfirmPassword ? "fa-eye-low-vision" : "fa-eye"
                      }`}
                    ></i>
                  </div>
                </div>
              </div>

              <div className="matching_error">{errors.confirm_password}</div>
              <button
                className="formik_submit"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
        <div className="login_error">error</div>
      </div>
    </div>
  );
};

export default Signup;
