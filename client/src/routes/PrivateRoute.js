import { Route, useHistory } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContextProvider";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoding] = useState(true);
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
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} user={user} setUser={setUser} history={history} />
      )}
    />
  );
};

export default PrivateRoute;
