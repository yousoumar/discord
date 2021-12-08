import "./Chat.scss";
import { useEffect, useState, useContext } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { ChatContext } from "../../contexts/ChatContextProvider";
import Member from "../../components/Member/Member";
export default function Chat() {
  const { currentChannel, setCurrentChannel, showSidebar, setShowSidebar } =
    useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentChannel) {
          const res = await fetch("/api/channel/");
          const data = await res.json();
          console.log(data);
          setCurrentChannel(data.channel);
        } else {
          const res = await fetch(
            "/api/channel/getChannelMessages/" + currentChannel._id
          );
          const data = await res.json();
          setMessages(data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannel]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    e.currentTarget.message.value = "";

    try {
      await fetch(
        "/api/channel/addMessageToChannel/" + currentChannel._id,

        {
          method: "POST",
          body: JSON.stringify({ text: message }),
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat">
      <Topbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        currentChannel={currentChannel}
      />

      <Sidebar currentChannel={currentChannel} showSidebar={showSidebar} />
      <div className="messages">
        {messages &&
          messages.map((m) => (
            <div className="message" key={m._id}>
              <Member member={m.owner} />
              <div className="text">{m.text}</div>
            </div>
          ))}
      </div>

      <form action="" onSubmit={handleSumbit}>
        <div className="group">
          <input type="text" name="message" placeholder="Type a message here" />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
