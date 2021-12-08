import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../../contexts/ChatContextProvider";

import "./ChannelList.scss";
export default function ChannelList({ setShowChannels }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setCurrentChannel, setShowSidebar } = useContext(ChatContext);
  console.log(setCurrentChannel);
  useEffect(() => {
    const fetchChannels = async () => {
      const res = await fetch("/api/channel/getChannels");
      const data = await res.json();
      setChannels(data);
      setLoading(false);
    };
    fetchChannels();
  }, []);
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
