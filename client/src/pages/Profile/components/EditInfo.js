import { useState } from "react";

export default function EditInfo({ user, setUser, setError }) {
  const [loading, setLoading] = useState(false);
  const [showFrom, setShowForm] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.currentTarget.name.value.trim();
    const bio = e.currentTarget.bio.value.trim();
    const phone = e.currentTarget.phone.value.trim();
    const res = await fetch("/api/user/updateProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        bio,
        phone,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data);
      setLoading(false);
      setShowForm(false);
    }
  };

  if (showFrom) {
    return (
      <div className="info-box">
        <form onSubmit={handleSubmit}>
          <div className="group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name..."
              name="name"
              defaultValue={user.name}
            />
          </div>
          <div className="group">
            <label htmlFor="bio">Bio</label>
            <textarea
              type="text"
              placeholder="Enter your bio..."
              name="bio"
              defaultValue={user.bio}
            ></textarea>
          </div>
          <div className="group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              placeholder="Enter your phone..."
              name="phone"
              defaultValue={user.phone}
            />
          </div>
          <button type="submit" className="button primary">
            {loading ? "Saving ..." : "Save"}
          </button>
          {!loading && (
            <button
              to=""
              className="button"
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
          <h2>Profile</h2>
        </div>
        <div className="right">
          <button
            to=""
            className="button primary"
            onClick={() => {
              setShowForm(true);
              setError(false);
            }}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="row">
        <div className="left">
          <p>Name</p>
        </div>
        <div className="right">
          <p>{user.name ? user.name : "................."}</p>
        </div>
      </div>
      <div className="row">
        <div className="left">
          <p>Bio</p>
        </div>
        <div className="right">
          <p>{user.bio ? user.bio : "................."}</p>
        </div>
      </div>
      <div className="row">
        <div className="left">
          <p>Phone</p>
        </div>
        <div className="right">
          <p>{user.phone ? user.phone : "................."}</p>
        </div>
      </div>
    </div>
  );
}
