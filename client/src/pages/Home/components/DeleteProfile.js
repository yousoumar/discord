import { useState } from "react";

export default function DeleteProfile({ setUser, user, history }) {
  const [loading, setLoading] = useState(false);
  const [showFrom, setShowForm] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const password = e.currentTarget.password.value;

    const res = await fetch("/api/auth/deleteProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.removeItem("logged");
      history.push("/login");
    } else {
      setError(data);
      setLoading(false);
    }
  };

  if (showFrom) {
    return (
      <div className="info-box">
        <form onSubmit={handleSubmit}>
          <div className="group">
            <label htmlFor="currentPassword">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
            />
          </div>

          <p className="error">{error.password}</p>
          <button type="submit" className="button danger">
            {loading ? "Deleting ..." : "Delete"}
          </button>
          {!loading && (
            <button
              to=""
              className="button "
              onClick={() => setShowForm(false)}
              style={{ marginLeft: "1rem" }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    );
  }
  return (
    <div className="info-box">
      <div className="row">
        <div className="left">
          <h2>Account</h2>
        </div>
        <div className="right">
          <button
            to=""
            className="button danger"
            onClick={() => setShowForm(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="row">
        <div className="left">
          <p>Email</p>
        </div>
        <div className="right">
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}
