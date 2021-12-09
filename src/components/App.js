import React from 'react'
import NavBar from './NavBar';
import Home from './Home';
import LandingPage from './LandingPage';
import CreateNewUser from './CreateNewUser';
import OrganizedTrip from './OrganizedTrip';
import Adventure from './Adventure';
import { Route, Switch } from "react-router-dom";
import {useState, useContext} from 'react'
import {UserContext} from '../context/userState'


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const {user, setUser} = useContext(UserContext)
  
  const changeUser = (user) => {
    setUser(user)
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
          <Home currentUser={user} changeUser={changeUser}/>
        </Route>
        <Route path="/create_new_user">
          <CreateNewUser changeUser={changeUser}/>
        </Route>
        <Route exact path="/">
          <LandingPage changeUser={changeUser}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
