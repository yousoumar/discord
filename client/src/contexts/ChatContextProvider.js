import { createContext, useState, useRef, useContext, useEffect } from "react";
import { io } from "socket.io-client";

import { useUserContext } from "./UserContextProvider";
const ChatContext = createContext();
export const useChatContext = () => {
  return useContext(ChatContext);
};

export default function ChatContextProvider({ children }) {
  const { user } = useUserContext();

  const socket = useRef();
  const chatBoxRef = useRef();

  const [currentChannel, setCurrentChannel] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentChannelMembers, setCurrentChannelMembers] = useState([]);
  const [currentChannelMessages, setCurrentChannelMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [showChannels, setShowChannels] = useState(false);
  const [currentChannelOnlineMembers, setCurrentChannelOnlineMembers] =
    useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentChannel) {
          const res = await fetch("/api/channel/");
          const data = await res.json();
          if (res.ok) {
            setCurrentChannel(data.channel);
          } else {
            throw Error(data.message);
          }
        } else {
          const res = await fetch(
            "/api/channel/getChannelMessages/" + currentChannel._id
          );
          const data = await res.json();
          if (res.ok) {
            console.log(data.messages);
            setCurrentChannelMessages(data.messages);
          } else {
            throw Error(data.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannel]);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL, {
      transports: ["websocket"],
    });
    if (!currentChannel) return;
    socket.current.emit("addUser", {
      user,
      roomId: currentChannel._id,
    });
    socket.current.on("addUser", (user) => {
      if (!currentChannelMembers.some((u) => u._id === user._id)) {
        setCurrentChannelMembers([...currentChannelMembers, user]);
      }
    });

    socket.current.on("getUsers", (users) => {
      let filtredUsers = users.filter(
        (user) => user.roomId === currentChannel._id
      );
      setCurrentChannelOnlineMembers(filtredUsers.map((user) => user.user));
    });

    socket.current.on("getMessage", (data) => {
      currentChannelMessages([...currentChannelMessages, data.message]);
    });
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    return () => {
      socket.current.emit("removeUser", {
        userId: user._id,
        roomId: currentChannel._id,
      });
    };
  }, [
    currentChannel,
    user,
    socket,
    setCurrentChannelOnlineMembers,
    currentChannelMembers,
    setCurrentChannelMembers,
    chatBoxRef,
    currentChannelMessages,
  ]);

  return (
    <ChatContext.Provider
      value={{
        currentChannel,
        setCurrentChannel,
        showSidebar,
        setShowSidebar,
        currentChannelMembers,
        setCurrentChannelMembers,
        socket,
        channels,
        setChannels,
        showChannels,
        setShowChannels,
        currentChannelOnlineMembers,
        setCurrentChannelOnlineMembers,
        currentChannelMessages,
        setCurrentChannelMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
