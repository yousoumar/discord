import Profile from "./components/Profile";
import Password from "./components/Password";
import Header from "../../components/Header/Header";

import "./Home.scss";
import DeleteProfile from "./components/DeleteProfile";

export default function Home({ user, setUser, history }) {
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
