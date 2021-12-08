import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Profile from "../../pages/Profile/Profile";
import UserContextProvider from "../../contexts/UserContextProvider";
import "./App.scss";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import NotFound from "../../pages/NotFound/NotFound";
import PrivateRoute from "../../routes/PrivateRoute";
import Chat from "../../pages/Chat/Chat";
import ChatContextProvider from "../../contexts/ChatContextProvider";

function App() {
  return (
    <div className="app">
      <Router>
        <UserContextProvider>
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
            <PrivateRoute path="/profile" component={Profile}></PrivateRoute>

            <PrivateRoute exact path="/">
              <ChatContextProvider>
                <Chat />
              </ChatContextProvider>
            </PrivateRoute>

            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
