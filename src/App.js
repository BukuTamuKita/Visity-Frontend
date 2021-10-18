import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from './context/UserContext';
import "tailwindcss/tailwind.css";
import SearchUser from "./pages/SearchUser";
import UserAdmin from "./pages/UserAdmin";
import AppointmentHistory from "./pages/AppointmentHistory";
import Testing from "./pages/Testing";
import CreateUser from "./pages/CreateUser";
import AppointmentPage from "./pages/AppointmentPage";
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import "./App.css";
// import Drawer from "./components/Drawer";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [value,setValue] = useState("");
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path="/" component={Login} exact/>
        <UserContext.Provider value={{value,setValue}}>
          <Route path="/search" component={SearchUser} exact/>
          <Route path="/appointment" component={AppointmentPage} exact/>
        </UserContext.Provider>
        <Route path="/user" component={UserAdmin} exact/>
        <Route path="/history" component={AppointmentHistory} exact/>
        <Route path="/testing" component={Testing} exact/>
        <Route path="/createUser" component={CreateUser} />
      </Switch>
    </Router>
  );
}

export default App;
