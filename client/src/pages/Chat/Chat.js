import "./Chat.scss";

import { useRef, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useChatContext } from "../../contexts/ChatContextProvider";
import { useUserContext } from "../../contexts/UserContextProvider";
import Message from "../../components/Message/Message";

export default function Chat() {
  const [writingUserName, setWritingUserName] = useState("");
  const { channel, channelMessages, socket } = useChatContext();
  const { user } = useUserContext();
  const chatBoxRef = useRef();

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [channelMessages]);

  useEffect(() => {
    setWritingUserName("");
  }, [channel]);

  useEffect(() => {
    if (!socket.current) return;

    socket.current.on("userWriting", (userName) => {
      setWritingUserName(userName);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writingUserName, socket.current]);

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
          <Message message={m} key={m._id} />
        ))}
      </div>
      {writingUserName && (
        <p className="writing">{writingUserName} is writing...</p>
      )}
      <form action="" onSubmit={handleSumbit}>
        <div className="group">
          <input
            type="text"
            name="message"
            placeholder="Type a message here"
            onFocus={() => {
              socket.current.emit("userWriting", {
                userName: user.name,
                roomId: channel._id,
              });
            }}
            onBlur={() => {
              socket.current.emit("userWriting", {
                userName: "",
                roomId: channel._id,
              });
            }}
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
