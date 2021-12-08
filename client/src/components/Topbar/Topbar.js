import "./Topbar.scss";
export default function Topbar({
  showSidebar,
  setShowSidebar,
  currentChannel,
}) {
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
