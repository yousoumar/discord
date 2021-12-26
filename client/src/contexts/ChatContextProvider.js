import { createContext, useState, useRef, useContext, useEffect } from "react";
import { io } from "socket.io-client";

import { useUserContext } from "./UserContextProvider";

const ChatContext = createContext();

export const useChatContext = () => {
  return useContext(ChatContext);
};

export default function ChatContextProvider({ children }) {
  const [channel, setChannel] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [channelMembers, setChannelMembers] = useState([]);
  const [channelMessages, setChannelMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [showChannels, setShowChannels] = useState(false);
  const [channelOnlineMembers, setChannelOnlineMembers] = useState([]);
  const { user } = useUserContext();

  const socket = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!channel) {
          const res = await fetch("/api/channel/");
          const data = await res.json();
          if (res.ok) {
            setChannel(data.channel);
          } else {
            throw Error(data.message);
          }
        } else {
          const res = await fetch(
            "/api/channel/getChannelMessages/" + channel._id
          );
          const data = await res.json();
          if (res.ok) {
            setChannelMessages(data.messages);
          } else {
            throw Error(data.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [channel]);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL, {
      transports: ["websocket"],
    });
    if (!channel) return;
    socket.current.emit("addUser", {
      user,
      roomId: channel._id,
    });
    socket.current.on("addUser", (user) => {
      if (!channelMembers.some((u) => u._id === user._id)) {
        setChannelMembers([...channelMembers, user]);
      }
    });

    socket.current.on("getUsers", (users) => {
      setChannelOnlineMembers(users);
    });

    socket.current.on("getMessage", (message) => {
      setChannelMessages([...channelMessages, message]);
    });

    return () => {
      socket.current.emit("removeUser", {
        userId: user._id,
        roomId: channel._id,
      });
    };
  }, [
    channel,
    user,
    socket,
    setChannelOnlineMembers,
    channelMembers,
    setChannelMembers,
    channelMessages,
  ]);

  return (
    <ChatContext.Provider
      value={{
        channel,
        setChannel,
        showSidebar,
        setShowSidebar,
        channelMembers,
        setChannelMembers,
        socket,
        channels,
        setChannels,
        showChannels,
        setShowChannels,
        channelOnlineMembers,
        setChannelOnlineMembers,
        channelMessages,
        setChannelMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
