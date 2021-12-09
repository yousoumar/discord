import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContextProvider";
import "./Topbar.scss";
export default function Topbar() {
  const { showSidebar, setShowSidebar, currentChannel } =
    useContext(ChatContext);
  return (
    <div className="topbar">
      <h1>{currentChannel && currentChannel.name}</h1>
      <button
        onClick={() => {
          setShowSidebar(!showSidebar);
        }}
      >
        {showSidebar ? "Close" : "Menu"}
      </button>
    </div>
  );
}
