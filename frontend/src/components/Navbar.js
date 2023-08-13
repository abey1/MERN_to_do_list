import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { LOGOUT } from "../utils/Constant";
const Navbar = () => {
  const { user, authDispatch } = useAuthContext();
  return (
    <nav>
      <div className="logo">
        <Link className="logo_link" to="/">
          My Todo List
        </Link>
      </div>
      {user ? (
        <div className="signed_in_user">
          <h4>{user.email}</h4>
          <div
            className="log_out"
            onClick={() => {
              localStorage.removeItem("token");
              authDispatch({ type: LOGOUT });
            }}
          >
            logout
          </div>
        </div>
      ) : (
        <div className="sign_up_sign_in">
          <Link className="link" to="/login">
            login
          </Link>
          <Link className="link" to="/signup">
            signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
