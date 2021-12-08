import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import ChannelList from "../ChannelList/ChannelList";
import Member from "../Member/Member";
import "./Sidebar.scss";
export default function Sidebar({ currentChannel }) {
  const [showChannels, setShowChannels] = useState(false);
  const [currentChannelMembers, setCurrentChannelMembers] = useState([]);
  const { user } = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "/api/channel/getChannelMembers/" + currentChannel._id
      );
      const data = await res.json();
      console.log(data.members);
      setCurrentChannelMembers(data.members);
    };
    fetchData();
  }, [currentChannel]);

  return (
    <nav className="sidebar">
      <div className="top">
        {!showChannels ? (
          <button onClick={() => setShowChannels(!showChannels)}>
            <img src="/icons/chevron-left.svg" alt="" />{" "}
            <span>All channels</span>
          </button>
        ) : (
          <div>Channels</div>
        )}
      </div>
      {showChannels ? (
        <div className="body">
          <ChannelList />
        </div>
      ) : (
        <div className="body">
          <div className="current-channel">
            <h1>{currentChannel ? currentChannel.name : "..."}</h1>
            <p>{currentChannel ? currentChannel.description : "..."}</p>
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
        <Member member={user} />
      </div>
    </nav>
  );
}
