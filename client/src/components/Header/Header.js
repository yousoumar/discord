import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import logo from "../../assets/logo.svg";
import "./Header.scss";
export default function Nav() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="" />
      </Link>
      <div className="div">
        {user ? (
          <Link
            to="/logout"
            className="button"
            onClick={async () => {
              await fetch("/api/auth/logout");
              history.push("/login");
              localStorage.removeItem("logged");
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
