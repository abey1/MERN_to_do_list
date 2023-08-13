import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./contexts/AuthContext";
import { useEffect } from "react";
import { BACKEND_URL, LOGIN } from "./utils/Constant";

function App() {
  const { user, authDispatch } = useAuthContext();
  useEffect(() => {
    const checkLogin = async () => {
      const result = await fetch(`${BACKEND_URL}/user/check_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await result.json();
      // if jwt is not expired
      if (json.user) {
        // create new user for authcontext user
        authDispatch({ type: LOGIN, payload: json.user });
      }
      //if error ocured like jwt expired
      if (json.error) {
        if (json.error === "jwt expired") {
          // remove local storage
          localStorage.removeItem("token");
        }
      }
      console.log("result = ", json);
    };
    return () => checkLogin();
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
