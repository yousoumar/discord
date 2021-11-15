import Form from "../../components/Form/Form";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/User";

export default function Signup() {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
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
      history.push("/");
    } else {
      setError(data);
    }
  };
  return (
    <main>
      <h1>Signup page</h1>
      <Form handleSubmit={handleSubmit} error={error} />
    </main>
  );
}
