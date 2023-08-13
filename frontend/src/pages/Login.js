import React, { useState } from "react";
import { Formik } from "formik";
import { BACKEND_URL, LOGIN } from "../utils/Constant";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { authDispatch } = useAuthContext();
  return (
    <div className="login_container">
      <div className="login">
        <h2>Login</h2>
        <Formik
          initialValues={{ email: "", password: "", error: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const identity = { email: values.email, password: values.password };
            const response = await fetch(`${BACKEND_URL}/user/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(identity),
            });
            const json = await response.json();
            console.log(identity);
            console.log(json);
            console.log(response);
            if (response.ok) {
              authDispatch({
                type: LOGIN,
                payload: { email: json.user.email, _id: json.user._id },
              });
              localStorage.setItem("token", json.token);
            } else {
              values.error = json.error;
            }
            setSubmitting(false);
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
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
                onFocus={() => {
                  values.error = "";
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="password_container">
                <input
                  className="formik_input"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  onFocus={() => {
                    values.error = "";
                  }}
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
                      className={`fa-solid ${
                        showPassword ? "fa-eye-low-vision" : "fa-eye"
                      }`}
                    ></i>
                  </div>
                </div>
              </div>
              {isSubmitting ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <button
                  className="formik_submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              )}

              {values.error !== "" && (
                <div className="login_error">{values.error}</div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
