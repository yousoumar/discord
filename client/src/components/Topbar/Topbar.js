import { useState } from "react";
import { useChatContext } from "../../contexts/ChatContextProvider";
import "./Topbar.scss";
export default function Topbar() {
  const { showSidebar, setShowSidebar, channel, channels, setChannels } =
    useChatContext();
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createChannel = async (e) => {
    e.preventDefault();
    if (loading) return;
    const name = e.currentTarget.name.value.trim();
    const description = e.currentTarget.description.value.trim();

    if (!name || !description) {
      setError("A channel should have a name and description.");
      return;
    }
    setLoading(true);
    try {
      const res = await await fetch("/api/channel/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setChannels([...channels, data]);
        setLoading(false);
        setShowForm(false);
        setShowSidebar(true);
      } else {
        throw Error(data.message);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="topbar">
      <h1>{channel && channel.name}</h1>
      <div className="btns">
        <button
          onClick={() => {
            setShowForm(true);
          }}
        >
          Create a channel
        </button>
        <button
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className="menu"
        >
          {showSidebar ? "Close" : "Menu"}
        </button>
      </div>
      {showForm && (
        <div className="form-container">
          <form action="" onSubmit={(e) => createChannel(e)}>
            {error && <p className="error">{error}</p>}
            <input type="text" name="name" placeholder="Channel name" />
            <textarea
              type="text"
              name="description"
              placeholder="Channel description"
            />

            <div className="btns">
              <button className="button primary">
                {!loading ? "Create" : "........................."}
              </button>
              {!loading && (
                <button
                  className="button cancel"
                  onClick={(e) => {
                    setShowForm(false);
                    setError(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
