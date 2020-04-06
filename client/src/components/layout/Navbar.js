import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';

const Navbar = () => {
    //Update so that you can use isSignedIn and based on that value update the navigation
    return(
        <header>
      <div className="logo-container">
        <img src={Logo} alt="logo" id="logo-image"/>
        <h1><Link to="/">Fit Ally</Link></h1>
      </div>

      <nav>
        <ul className="nav-links">
          <li><Link className="nav-link" to="/demo">View Demo</Link></li>
          <li><Link className="nav-link" to="/register">Sign Up</Link></li>
          <li><Link className="nav-link" to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
    )
}

export default Navbar;