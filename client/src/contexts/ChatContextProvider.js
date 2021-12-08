import { createContext, useState } from "react";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <ChatContext.Provider
      value={{ currentChannel, setCurrentChannel, showSidebar, setShowSidebar }}
    >
      {children}
    </ChatContext.Provider>
  );
}
