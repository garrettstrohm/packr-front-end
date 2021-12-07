import React from 'react'
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import CreateNewUser from './CreateNewUser';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path="/create_new_user">
          <CreateNewUser />
        </Route>
        <Route path="/welcome">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
