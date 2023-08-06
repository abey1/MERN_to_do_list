import React, { useState } from "react";
import { Formik } from "formik";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="login_container">
      <div className="login">
        <h2>Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
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

export default Login;
