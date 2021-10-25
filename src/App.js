import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import "tailwindcss/tailwind.css";
import SearchUser from "./pages/SearchUser";
import UserAdmin from "./pages/UserAdmin";
import AppointmentHistory from "./pages/AppointmentHistory";
import Testing from "./pages/Testing";
import CreateUser from "./pages/CreateUser";
import AppointmentPage from "./pages/AppointmentPage";
import Login from "./pages/Login";
import "./App.css";
import Drawer from "./components/Drawer";

function App() {
  const [value, setValue] = useState("");
  return (
    <Router>
      <div className="relative min-h-screen md:flex">
        <Drawer />
        <div className={"flex-auto"}>
          <Switch>
            <Route path="/" component={Login} exact />
            <UserContext.Provider value={{ value, setValue }}>
              <Route path="/search" component={SearchUser} exact />
              <Route path="/appointment" component={AppointmentPage} />
            </UserContext.Provider>
            <Route path="/user" component={UserAdmin} />
            <Route path="/history" component={AppointmentHistory} />
            <Route path="/testing" component={Testing} />
            <Route path="/createUser" component={CreateUser} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
