import React from 'react'
import NavBar from './NavBar';
import Home from './Home';
import LandingPage from './LandingPage';
import CreateNewUser from './CreateNewUser';
import OrganizedTrip from './OrganizedTrip';
import Adventure from './Adventure';
import { Route, Switch } from "react-router-dom";
import {useState} from 'react'


function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const changeUser = (user) => {
    setCurrentUser(user)
  }
  return (
    <div className="App">
      <Switch>
        <Route path="/adventures/adventure/:id">
          <Adventure />
        </Route>
      <Route path="/trips/trip/:id">
          <OrganizedTrip />
        </Route>
        <Route path="/home/:username">
          <Home currentUser={currentUser} changeUser={changeUser}/>
        </Route>
        <Route path="/create_new_user">
          <CreateNewUser changeUser={changeUser}/>
        </Route>
        <Route path="/">
          <LandingPage changeUser={changeUser}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
