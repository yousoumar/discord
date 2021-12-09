import Form from "../../components/Form/Form";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContextProvider";
import logo from "../../assets/logo.svg";
import "./Signup.scss";
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useUserContext();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("logged")) {
      history.push("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.currentTarget.email.value.trim();
    const password = e.currentTarget.password.value.trim();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      localStorage.setItem("logged", true);
      setLoading(false);
      history.push("/profile");
    } else {
      setLoading(false);
      setError(data);
    }
  };
  return (
    <main className="singup">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <h1>
        Join thousands of learners <br />
        from around the world{" "}
      </h1>
      <p>
        Master web development by making real-life <br /> projects. There are
        multiple paths for you to <br />
        choose
      </p>
      <Form
        handleSubmit={handleSubmit}
        error={error}
        submitMessage="Start coding"
        loading={loading}
      />
      <p>
        Adready a member ? <Link to="/login"> Login</Link>
      </p>
    </main>
  );
}
