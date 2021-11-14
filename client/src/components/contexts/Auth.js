import { createContext, useState, useEffect } from "react";
export const UserContext = createContext();
export default function Auth({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetcher(token);
    }

    function fetcher(token) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch("/api/auth/getuser", config)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
    return () => {};
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
