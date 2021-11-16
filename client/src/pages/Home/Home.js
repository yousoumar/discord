import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../contexts/User";

import "./Home.scss";

export default function Home() {
  const [loading, setLoding] = useState(true);
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setLoding(false);
      return;
    }
    fetch("/api/auth/getuser")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setLoding(false);
          localStorage.removeItem("logged");
          history.push("/login");
        }
      })
      .then((data) => {
        setLoding(false);
        setUser(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <main className="home">
      <h1>My awesome home page</h1>
    </main>
  );
}
