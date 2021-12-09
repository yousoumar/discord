import { useState, useEffect } from "react";
import { useChatContext } from "../../contexts/ChatContextProvider";
import { useUserContext } from "../../contexts/UserContextProvider";

import "./ChannelList.scss";
export default function ChannelList({ setShowChannels, socket }) {
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const {
    currentChannel,
    setCurrentChannel,
    setShowSidebar,
    setChannels,
    channels,
  } = useChatContext();

  useEffect(() => {
    const fetchChannels = async () => {
      const res = await fetch("/api/channel/getChannels");
      const data = await res.json();
      setChannels(data);
      setLoading(false);
    };
    fetchChannels();
  }, [setChannels]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="channel-list">
      {channels.map((c) => (
        <button
          className="item"
          key={c._id}
          onClick={() => {
            fetch("/api/channel/join/" + c._id, { method: "PUT" });
            socket.current.emit("removeUser", {
              userId: user._id,
              roomId: currentChannel._id,
            });
            setCurrentChannel(c);
            setShowSidebar(false);
            setShowChannels(false);
          }}
        >
          <div className="left">{c.name[0]}</div>
          <div className="right">{c.name}</div>
        </button>
      ))}
    </div>
  );
}
