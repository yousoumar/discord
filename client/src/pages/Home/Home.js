import { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../contexts/User";
import Header from "../../components/Header/Header";
import ChangeInfo from "../../components/ChangeInfo/ChangeInfo";
import "./Home.scss";

export default function Home() {
  const [loading, setLoding] = useState(true);
  const [showChangeInfo, setShowChangeInfo] = useState(false);

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
      {!showChangeInfo ? (
        <main>
          <h1>Personal info</h1>
          <p>Basic info, like your name and photo</p>

          <div className="info-box">
            <div className="row">
              <div className="left">
                <h2>Profile</h2>
              </div>
              <div className="right">
                <button
                  to=""
                  className="button"
                  onClick={() => setShowChangeInfo(!showChangeInfo)}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="row">
              <div className="left">
                <p>Name</p>
              </div>
              <div className="right">
                <p>{user.name ? user.name : "No name set"}</p>
              </div>
            </div>
            <div className="row">
              <div className="left">
                <p>Bio</p>
              </div>
              <div className="right">
                <p>{user.bio ? user.bio : "No bio set"}</p>
              </div>
            </div>
            <div className="row">
              <div className="left">
                <p>Phone</p>
              </div>
              <div className="right">
                <p>{user.phone ? user.phone : "No phone set"}</p>
              </div>
            </div>
            <div className="row">
              <div className="left">
                <p>Email</p>
              </div>
              <div className="right">
                <p>{user.email}</p>
              </div>
            </div>

            <div className="row">
              <div className="left">
                <p>Password</p>
              </div>
              <div className="right">
                <p>************</p>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <ChangeInfo setShowChangeInfo={setShowChangeInfo} />
      )}
    </div>
  );
}
