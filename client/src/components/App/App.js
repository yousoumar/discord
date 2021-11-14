import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Home from "../../pages/Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Auth from "../contexts/Auth";
import "./App.scss";
import HomeRoute from "../routes/HomeRoute";
function App() {
  return (
    <div className="app">
      <Router>
        <Auth>
          <Header />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <HomeRoute path="/" component={Home} />
          </Switch>
          <Footer />
        </Auth>
      </Router>
    </div>
  );
}

export default App;
