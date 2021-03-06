import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const useUserContext = () => {
  return useContext(UserContext);
};

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
