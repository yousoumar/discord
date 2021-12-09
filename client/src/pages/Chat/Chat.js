import "./Chat.scss";

import { useEffect, useState, useContext, useRef } from "react";
import { io } from "socket.io-client";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { ChatContext } from "../../contexts/ChatContextProvider";
import Member from "../../components/Member/Member";
import { UserContext } from "../../contexts/UserContextProvider";

export default function Chat() {
  const { currentChannel, setCurrentChannel, showSidebar, socket } =
    useContext(ChatContext);
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentChannel) {
          const res = await fetch("/api/channel/");
          const data = await res.json();
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

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    if (!currentChannel) return;
    socket.current.emit("addUser", {
      user,
      roomId: currentChannel._id,
    });
    socket.current.on("getUsers", (users) => {
      console.log(users.filter((user) => user.roomId === currentChannel._id));
    });
    socket.current.on("getMessage", (data) => {
      setMessages([...messages, data.message]);
    });
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    return () => {
      socket.current.emit("removeUser", {
        userId: user._id,
        roomId: currentChannel._id,
      });
    };
  }, [currentChannel, user, messages, socket]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    e.currentTarget.message.value = "";

    try {
      const res = await fetch(
        "/api/channel/addMessageToChannel/" + currentChannel._id,

        {
          method: "POST",
          body: JSON.stringify({ text: message }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      socket.current.emit("sendMessage", {
        senderId: user._id,
        roomId: currentChannel._id,
        message: data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat">
      <Topbar />

      <Sidebar
        currentChannel={currentChannel}
        showSidebar={showSidebar}
        socket={socket}
      />
      <div className="messages" ref={chatBoxRef}>
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
