import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import About from './views/About';
import Contact from './components/Contact';
import Landing from './views/Landing';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import CreateProfile from './components/CreateProfile';
import UpdateStats from './components/UpdateStats';
import Error from './views/Error';

import './styles/App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' component={Landing} exact />
          <Route path='/about' component={About} exact />
          <Route path='/contact' component={Contact} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/createprofile' component={CreateProfile} exact />
          <Route path='/stats' component={UpdateStats} exact />
          <Route path='' component={Error} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
