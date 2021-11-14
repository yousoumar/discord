import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/Auth";
import "./Header.scss";
export default function Nav() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  return (
    <header className="header">
      <Link to="/" className="logo">
        AuthApp
      </Link>
      <div className="div">
        {user ? (
          <Link
            to="/logout"
            className="button"
            onClick={() => {
              localStorage.removeItem("token");
              history.push("/login");
              setUser(null);
            }}
          >
            Logout
          </Link>
        ) : (
          <>
            {" "}
            <Link to="/login" className="login">
              Log In
            </Link>
            <Link to="/signup" className="button">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
