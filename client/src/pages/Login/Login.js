import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/User";
import Form from "../../components/Form/Form";
export default function Login() {
  const history = useHistory();
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("logged")) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
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
      setUser(data);
      localStorage.setItem("logged", true);
      history.push("/");
    } else {
      setError(data);
    }
  };
  return (
    <main>
      <h1>Log In</h1>
      <Form handleSubmit={handleSubmit} error={error} />
    </main>
  );
}
