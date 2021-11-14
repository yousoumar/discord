import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/Auth";
import Form from "../../components/Form/Form";
export default function Login() {
  const history = useHistory();

  const { setUser } = useContext(UserContext);

  const [error, setError] = useState(null);
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
      console.log(data);
      setUser(data);
      localStorage.setItem("token", data._id);
      history.push("/");
    } else {
      setError(data.email ? data.email : data.password);
    }
  };
  return (
    <main>
      {error && <p>{error}</p>}
      <h1>Log In</h1>

      <Form handleSubmit={handleSubmit} />
    </main>
  );
}
