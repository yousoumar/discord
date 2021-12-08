import "./Topbar.scss";
export default function Topbar({ showSidebar, setShowSidebar }) {
  return (
    <div className="topbar">
      <h1>Welcome</h1>
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
