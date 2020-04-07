import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './views/About';
import Landing from './views/Landing';
import Login from './containers/auth/Login';
import Error from './views/Error';

import './App.css';

function App() {
  return (
    <Router >
          <Switch >
            <Route path="/" component={Landing} exact />
            <Route path="/about" component={About} exact />
            <Route path="/login" component={Login} exact />
            <Route path="" component={Error} />
          </Switch>
    </Router>
  );
}

export default App;
