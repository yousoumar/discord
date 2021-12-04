import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/User";

import Profile from "./components/Profile";
import Password from "./components/Password";
import Header from "../../components/Header/Header";

import "./Home.scss";
import DeleteProfile from "./components/DeleteProfile";

export default function Home() {
  const [loading, setLoding] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setLoding(false);
      return;
    }
    fetch("/api/user/getuser")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          localStorage.removeItem("logged");
          history.push("/login");
          setLoding(false);
        }
      })
      .then((data) => {
        setUser(data);
        setLoding(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="home">
      <Header />

      <main>
        <Profile user={user} setUser={setUser} />
        <Password user={user} setUser={setUser} />
        <DeleteProfile user={user} setUser={setUser} history={history} />
      </main>
    </div>
  );
}
