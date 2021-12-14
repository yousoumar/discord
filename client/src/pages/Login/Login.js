import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContextProvider";

import Form from "../../components/Form/Form";
import logo from "../../assets/logo.svg";

import "./Login.scss";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("logged")) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.currentTarget.email.value.trim();
    const password = e.currentTarget.password.value.trim();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("logged", true);
      setLoading(false);
      setUser(data);

      if (!data.name.trim()) {
        history.push("/profile");
      } else {
        history.push("/");
      }
    } else {
      setLoading(false);
      setError(data);
    }
  };
  return (
    <main className="login">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <h1>All your freinds behind this form.</h1>
      <Form
        handleSubmit={handleSubmit}
        error={error}
        submitMessage="Login"
        loading={loading}
      />
      <p>
        Don’t have an account yet ? <Link to="/signup"> Register</Link>
      </p>
      <p style={{ marginTop: "1rem" }}>
        Forgot your password ? <Link to="/resetPassword">Reset</Link>
      </p>
    </main>
  );
}
