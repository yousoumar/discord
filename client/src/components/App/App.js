import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Home from "../../pages/Home/Home";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
import User from "../../contexts/User";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <User>
          {/* <Header /> */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
          {/* <Footer /> */}
        </User>
      </Router>
    </div>
  );
}

export default App;
