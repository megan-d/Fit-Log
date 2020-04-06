import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './views/About';
import Landing from './views/Landing';
import Error from './views/Error';

import './App.css';

function App() {
  return (
    <Router >
          <Switch >
            <Route path="/" component={Landing} exact />
            <Route path="/about" component={About} exact />
            <Route path="" component={Error} />
          </Switch>
    </Router>
  );
}

export default App;
