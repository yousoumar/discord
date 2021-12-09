import EditInfo from "./components/EditInfo";
import Password from "./components/Password";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

import "./Profile.scss";
import DeleteProfile from "./components/DeleteProfile";
import { useState } from "react";

export default function Profile({ user, setUser, history }) {
  const [error, setError] = useState(false);
  return (
    <div className="profile">
      <header className="header">
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
        <div className="div">
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
          <Link
            to="/"
            className="button primary"
            onClick={(e) => {
              if (!user.name) {
                setError(true);
                e.preventDefault();
              }
            }}
          >
            Join the chat
          </Link>
        </div>
      </header>

      <main>
        <div>
          <EditInfo user={user} setUser={setUser} setError={setError} />
          {error && (
            <p className="error">
              You have to set a name before joining the chat
            </p>
          )}
        </div>
        <div>
          <Password user={user} setUser={setUser} />
          <DeleteProfile user={user} setUser={setUser} history={history} />
        </div>
      </main>
    </div>
  );
}
