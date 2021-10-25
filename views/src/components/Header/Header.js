import { Link } from "react-router-dom";
import "./Header.scss";
export default function Nav() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        AuthApp
      </Link>
      <div className="div">
        <Link to="/login" className="login">
          Log In
        </Link>
        <Link to="/signup" className="button">
          Signup
        </Link>
      </div>
    </header>
  );
}
