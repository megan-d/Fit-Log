import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import About from './components/views/About';
import Contact from './components/Contact';
import Landing from './components/views/Landing';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Alert from './components/layout/Alert';
import CreateProfile from './components/CreateProfile';
import UpdateStats from './components//Cards/UpdateStats';
import UpdateGoals from './components/Cards/UpdateGoals';
import AddActivity from './components/AddActivity';
import Error from './components/views/Error';
import './styles/App.css';
import DashboardContainer from './containers/dashboard/DashboardContainer';
import setHeaderToken from './utilities/setHeaderToken';
//Redux imports
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

// if(localStorage.token) {
//   setHeaderToken(localStorage.token);
// }

const App = () => {

  //run loadUser upon App component mounting (like component did mount - will only run once with empty array)
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Alert />
          <Switch>
            <Route path='/' component={Landing} exact />
            <Route path='/about' component={About} exact />
            <Route path='/contact' component={Contact} exact />
            <Route path='/login' component={Login} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/createprofile' component={CreateProfile} exact />
            <Route path='/dashboard' component={DashboardContainer} exact />
            <Route path='/stats' component={UpdateStats} exact />
            <Route path='/goals' component={UpdateGoals} exact />
            <Route path='/activity' component={AddActivity} exact />
            <Route path='' component={Error} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
