import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function ResetPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const sendEmail = async (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value.trim();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/user/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });
      if (res.ok) {
        setEmailSent(true);
      } else {
        const data = await res.json();
        setError(data.email);
      }
      setLoading(false);
    } catch (error) {
      setError("Something went rong, please try later");
      setLoading(false);
    }
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    const resetPasswordToken = e.currentTarget.resetPasswordToken.value.trim();
    const password = e.currentTarget.password.value.trim();
    if (!resetPasswordToken || !password) return;
    setLoading(true);
    try {
      const res = await fetch("/api/user/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          resetPasswordToken,
        }),
      });
      if (res.ok) {
        history.push("/login");
      } else {
        const data = await res.json();
        setLoading(false);
        setError(data.message || data.password);
      }
    } catch (error) {
      setError("Something went rong, please try later");
      setLoading(false);
    }
  };
  if (emailSent) {
    return (
      <form onSubmit={resetPassword}>
        {error && <p className="error">{error}</p>}
        <label htmlFor="token">Enter the token in the mail</label>
        <input
          type="text"
          name="resetPasswordToken"
          id="token"
          placeholder="Token"
        />
        <label htmlFor="password">New password</label>
        <input type="password" name="password" placeholder="Password" />
        <button className="button primary" type="submit">
          {loading ? "Sending ..." : " Reset password"}
        </button>
      </form>
    );
  }
  return (
    <form onSubmit={sendEmail}>
      <label htmlFor="email">Enter your email to receive reset token</label>
      <input type="email" name="email" id="" placeholder="Email" />
      {error && <p className="error">{error}</p>}
      <button className="button primary" type="submit">
        {loading ? "Sending token..." : " Send token"}
      </button>
    </form>
  );
}
