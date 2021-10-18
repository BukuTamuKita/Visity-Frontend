import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchUser from "./pages/SearchUser";
import UserAdmin from "./pages/UserAdmin";
import AppointmentHistory from "./pages/AppointmentHistory";
import Testing from "./pages/Testing";
import CreateUser from "./pages/CreateUser";
import AppointmentPage from "./pages/AppointmentPage";
import Drawer from "./components/Drawer";
import "tailwindcss/tailwind.css";
import Login from './pages/Login';
import { UserContext } from './context/UserContext';
import Layout from "./pages/Layout";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [value,setValue] = useState("");
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
        {/* <Layout> */}
        <Switch>
          <Route path="/login" component={Login} />
          <UserContext.Provider value={{ value, setValue }}>
            <Route path="/search" component={SearchUser} exact />
            <Route path="/appointment" component={AppointmentPage} />
          </UserContext.Provider>
          <Route path="/user" component={UserAdmin} />
          <Route path="/history" component={AppointmentHistory} />
          <Route path="/testing" component={Testing} />
          <Route path="/createUser" component={CreateUser} />
        </Switch>
      {/* </Layout> */}
    </Router>
  );
}

export default App;
