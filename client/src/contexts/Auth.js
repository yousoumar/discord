import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
export const UserContext = createContext();

export default function Auth({ children }) {
  const [user, setUser] = useState(null);
  const history = useHistory();
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
        .then((res) => {
          console.log(res);
          if (res.ok) {
            res.json();
          } else {
            localStorage.removeItem("token");
            history.push("/login");
          }
        })
        .then((data) => setUser(data));
    }
  }, [history]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
