import { useState } from "react";

export default function Password({ setUser, user }) {
  const [loading, setLoading] = useState(false);
  const [showFrom, setShowForm] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const currentPassword = e.currentTarget.currentPassword.value.trim();
    const newPassword = e.currentTarget.newPassword.value.trim();

    const res = await fetch("/api/auth/updatePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data);
      setLoading(false);
      setShowForm(false);
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
            <label htmlFor="currentPassword">Current password</label>
            <input
              type="password"
              placeholder="Enter your current password"
              name="currentPassword"
            />
          </div>
          <div className="group">
            <label htmlFor="newPassword">New password</label>
            <input
              type="password"
              placeholder="Enter the new one"
              name="newPassword"
            />
          </div>
          <p className="error">{error && error.password}</p>
          <button type="submit" className="button primary">
            {loading ? "Saving ..." : "Save"}
          </button>
          {!loading && (
            <button
              to=""
              className="button "
              onClick={() => {
                setShowForm(false);
                setError(null);
              }}
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
          <h2>Password</h2>
        </div>
        <div className="right">
          <button to="" className="button" onClick={() => setShowForm(true)}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
