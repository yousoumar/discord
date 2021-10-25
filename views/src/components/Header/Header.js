import { Link } from "react-router-dom";
import "./Header.scss";
export default function Nav() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <span>A</span>uth<span>A</span>pp
      </Link>
      <div className="div">
        <Link to="/login" className="login">
          Log In
        </Link>
        <Link to="/signup" className="signup">
          Signup
        </Link>
      </div>
    </header>
  );
}
