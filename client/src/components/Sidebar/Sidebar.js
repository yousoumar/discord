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
    channel,
    channelMembers,
    setChannelMembers,
    showSidebar,
    setShowSidebar,
    showChannels,
    setShowChannels,
    channelOnlineMembers,
  } = useChatContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/channel/getChannelMembers/" + channel._id);
      const data = await res.json();
      setChannelMembers(data.members);
    };
    if (channel) {
      fetchData();
    }
  }, [channel, setChannelMembers]);

  return (
    <nav className={showSidebar ? "sidebar show" : "sidebar"}>
      <div className="top">
        {!showChannels ? (
          <button
            className="button all"
            onClick={() => setShowChannels(!showChannels)}
          >
            <img src="/icons/chevron-left.svg" alt="" />{" "}
            <span>All channels</span>
          </button>
        ) : (
          <h1>Channels</h1>
        )}
        <button
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className="button dark menu"
        >
          Close
        </button>
      </div>
      {showChannels ? (
        <div className="body">
          <ChannelList />
        </div>
      ) : (
        <div className="body">
          <div className="current-channel">
            <h1>{channel && channel.name} </h1>
            <p>{channel && channel.description}</p>
          </div>
          <div className="current-channel-members">
            <h1>Members</h1>
            <div className="members">
              {channelMembers.map((m) => (
                <Member
                  member={m}
                  key={m._id}
                  online={channelOnlineMembers.some((o) => m._id === o._id)}
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
