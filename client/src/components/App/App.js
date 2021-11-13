import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Home from "../../pages/Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./App.scss";
function App() {
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      console.log(data);
    };
    fetcher();
  }, []);
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
