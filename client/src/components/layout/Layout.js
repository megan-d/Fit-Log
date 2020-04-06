import React, { Fragment } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <div className="body-grow">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
