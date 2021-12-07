import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Home from "../../pages/Home/Home";
import User from "../../contexts/User";
import "./App.scss";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import NotFound from "../../pages/NotFound/NotFound";
import Channel from "../../pages/Channel/Channel";

function App() {
  return (
    <div className="app">
      <Router>
        <User>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/resetPassword">
              <ResetPassword />
            </Route>
            <Route exact path="/channel">
              <Channel />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
        </User>
      </Router>
    </div>
  );
}

export default App;
