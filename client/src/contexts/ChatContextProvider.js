import { createContext, useState, useRef } from "react";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentChannelMembers, setCurrentChannelMembers] = useState([]);
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
