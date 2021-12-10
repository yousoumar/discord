import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useChatContext } from "../../contexts/ChatContextProvider";
import { useUserContext } from "../../contexts/UserContextProvider";
import ChannelList from "../ChannelList/ChannelList";
import Member from "../Member/Member";
import "./Sidebar.scss";
export default function Sidebar() {
  const { user } = useUserContext();
  const {
    currentChannel,
    currentChannelMembers,
    setCurrentChannelMembers,
    showSidebar,
    showChannels,
    setShowChannels,
    currentChannelOnlineMembers,
  } = useChatContext();

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
          <ChannelList />
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
                <Member
                  member={m}
                  key={m._id}
                  online={currentChannelOnlineMembers.some(
                    (o) => m._id === o._id
                  )}
                />
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
