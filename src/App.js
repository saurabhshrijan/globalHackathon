import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Images from "./components/Image";
function App() {
  return (
  <Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/image-search'>
              <div className="content">
              <Images/>
              </div>
            </Route>
          </Switch>
    </div>
    </Router>
  );
}

export default App;