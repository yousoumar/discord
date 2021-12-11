import "./Chat.scss";

import { useRef, useEffect } from "react";
import TimeAgo from "timeago-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useChatContext } from "../../contexts/ChatContextProvider";
import Member from "../../components/Member/Member";
import { useUserContext } from "../../contexts/UserContextProvider";

export default function Chat() {
  const { channel, channelMessages, socket } = useChatContext();
  const { user } = useUserContext();
  const chatBoxRef = useRef();

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [channelMessages]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    e.currentTarget.message.value = "";

    try {
      const res = await fetch(
        "/api/channel/addMessageToChannel/" + channel._id,

        {
          method: "POST",
          body: JSON.stringify({ text: message }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      socket.current.emit("sendMessage", {
        senderId: user._id,
        roomId: channel._id,
        message: data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat">
      <Topbar />
      <Sidebar />
      <div className="messages" ref={chatBoxRef}>
        {channelMessages.map((m) => (
          <div className="message" key={m._id}>
            <Member member={m.owner} />
            <div className="text">{m.text}</div>
            <p className="date">
              <TimeAgo datetime={m.createdAt} opts={{ minInterval: 60 }} />
            </p>
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
