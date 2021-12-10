import { createContext, useState, useRef, useContext } from "react";

const ChatContext = createContext();
export const useChatContext = () => {
  return useContext(ChatContext);
};

export default function ChatContextProvider({ children }) {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentChannelMembers, setCurrentChannelMembers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [showChannels, setShowChannels] = useState(false);
  const [currentChannelOnlineMembers, setCurrentChannelOnlineMembers] =
    useState([]);
  const socket = useRef();
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
