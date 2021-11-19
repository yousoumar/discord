import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User";

import "./ChangeInfo.scss";
export default function ChangeInfo({ setShowChangeInfo }) {
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.currentTarget.name.value;
    const bio = e.currentTarget.bio.value;
    const phone = e.currentTarget.phone.value;
    console.log(name, bio, phone);
    const res = await fetch("/api/auth/update", {
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
      setShowChangeInfo(false);
    }
  };
  return (
    <form className="change-info" onSubmit={handleSubmit}>
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
      <button type="submit">{loading ? "Saving ..." : "Save"}</button>
      {!loading && (
        <button
          to=""
          className="button"
          onClick={() => setShowChangeInfo(false)}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
