import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <Fragment >
        <Layout >
        
        </Layout>
      </Fragment>
    </Router>
  );
}

export default App;
