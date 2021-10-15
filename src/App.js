import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchUser from './pages/SearchUser';
import UserAdmin from './pages/UserAdmin';
import AppointmentHistory from './pages/AppointmentHistory';
import Testing from './pages/Testing';
import CreateUser from "./pages/CreateUser";
import AppointmentPage from './pages/AppointmentPage'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import "tailwindcss/tailwind.css";
import Login from './pages/Login';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
      setIsOpen(!isOpen);
  };

  return (
    <Router>
        <Navbar toggle={toggle}/>
        <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/search" component={SearchUser} exact/>
        <Route path="/appointment" component={AppointmentPage} />
        <Route path="/user" component={UserAdmin} />
        <Route path="/history" component={AppointmentHistory} />
        <Route path="/testing" component={Testing} />
        <Route path="/createUser" component={CreateUser} />
      </Switch>
    </Router>
  );
}

export default App;
