import Form from "../../components/Form/Form";
export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.dir();
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
    console.log(data);
  };
  return (
    <main>
      <h1>Log In</h1>

      <Form handleSubmit={handleSubmit} />
    </main>
  );
}
