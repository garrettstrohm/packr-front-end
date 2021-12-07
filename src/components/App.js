import React from 'react'
import NavBar from './NavBar';
import LandingPage from './landingPage';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
