import React, { useState } from "react";
import { Formik } from "formik";
import { BACKEND_URL } from "../utils/Constant";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthContext } from "../contexts/AuthContext";
import { LOGIN } from "../utils/Constant";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { authDispatch } = useAuthContext();

  return (
    <div className="signup_container">
      <div className="signup">
        <h2>Signup</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirm_password: "",
            error: "",
          }}
          validate={(values) => {
            const errors = {};
            if (values.password !== values.confirm_password) {
              errors.confirm_password = "Password is not matching";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const identity = {
              email: values.email,
              password: values.password,
            };
            const response = await fetch(`${BACKEND_URL}/user/signup`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(identity),
            });
            const json = await response.json();
            if (response.ok) {
              authDispatch({
                type: LOGIN,
                payload: { email: json.user.email, _id: json.user._id },
              });
              localStorage.setItem("token", json.token);
            } else {
              console.log(json.error);
              values.error = json.error;
            }
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
                type="email"
                name="email"
                onChange={(e) => {
                  handleChange(e);
                }}
                onFocus={() => {
                  values.error = "";
                }}
                onBlur={(e) => {
                  handleBlur(e);
                }}
                value={values.email}
              />
              <div className="password_container">
                <input
                  className="formik_input"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onFocus={() => {
                    values.error = "";
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                  }}
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
              <div className="password_container">
                <input
                  className="formik_input"
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  name="confirm_password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onFocus={() => {
                    values.error = "";
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                  }}
                  value={values.confirm_password}
                />
                <div className="show_hide_holder">
                  <div
                    className="btn-holder"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      className={`fa-solid ${
                        showConfirmPassword ? "fa-eye-low-vision" : "fa-eye"
                      }`}
                    ></i>
                  </div>
                </div>
              </div>

              <div className="matching_error">{errors.confirm_password}</div>
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
                  Submit
                </button>
              )}

              {values.error !== "" ? (
                <div style={{ marginTop: "3vh" }} className="login_error">
                  {values.error}
                </div>
              ) : (
                <div></div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
