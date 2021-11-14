import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../contexts/Auth";
const HomeRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default HomeRoute;
