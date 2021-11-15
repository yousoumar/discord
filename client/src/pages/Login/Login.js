import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/User";
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
