import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../../contexts/ChatContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";
import ChannelList from "../ChannelList/ChannelList";
import Member from "../Member/Member";
import "./Sidebar.scss";
export default function Sidebar() {
  const [showChannels, setShowChannels] = useState(false);
  const { user } = useContext(UserContext);
  const {
    currentChannel,
    currentChannelMembers,
    setCurrentChannelMembers,
    showSidebar,
    socket,
  } = useContext(ChatContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "/api/channel/getChannelMembers/" + currentChannel._id
      );
      const data = await res.json();
      setCurrentChannelMembers(data.members);
    };
    if (currentChannel) {
      fetchData();
    }
  }, [currentChannel, setCurrentChannelMembers]);

  return (
    <nav className={showSidebar ? "sidebar show" : "sidebar"}>
      <div className="top">
        {!showChannels ? (
          <button onClick={() => setShowChannels(!showChannels)}>
            <img src="/icons/chevron-left.svg" alt="" />{" "}
            <span>All channels</span>
          </button>
        ) : (
          <h1>Channels</h1>
        )}
      </div>
      {showChannels ? (
        <div className="body">
          <ChannelList setShowChannels={setShowChannels} socket={socket} />
        </div>
      ) : (
        <div className="body">
          <div className="current-channel">
            <h1>{currentChannel && currentChannel.name} </h1>
            <p>{currentChannel && currentChannel.description}</p>
          </div>
          <div className="current-channel-members">
            <h1>Members</h1>
            <div className="members">
              {currentChannelMembers.map((m) => (
                <Member member={m} key={m._id} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="account">
        <Link to="/profile">
          {" "}
          <Member member={user} hideName={true} />
        </Link>
      </div>
    </nav>
  );
}
