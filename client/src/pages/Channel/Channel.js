import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./Channel.scss";
export default function Channel() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="channel">
      {showSidebar && <Sidebar />}

      <Topbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="messages">
        <div className="message">
          <div className="top">
            <img
              src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
              alt=""
            />

            <div className="name">Anne claire</div>
          </div>
          <div className="text">
            Lorem ipsum dolor pisum. Lorem ipsum dolor pisum.
          </div>
        </div>
      </div>
      <form action="">
        <div className="group">
          <input type="text" name="message" placeholder="Type a message here" />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
