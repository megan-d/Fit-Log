import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SideDrawer from './SideDrawer';

const Layout = (props) => {
  return (
    <div className="body-grow">
      <Navbar />
      <SideDrawer />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
