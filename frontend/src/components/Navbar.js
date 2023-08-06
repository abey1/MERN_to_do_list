import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link className="logo_link" to="/">
          My Todo List
        </Link>
      </div>
      <div className="sign_up_sign_in">
        <Link className="link" to="/login">
          login
        </Link>
        <Link className="link" to="/signup">
          signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
