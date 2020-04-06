import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';

const Navbar = () => {
    return(
        <header>
      <div class="logo-container">
        <img src={Logo} alt="logo" id="logo-image"/>
        <h1><a href="#">Fit Ally</a></h1>
      </div>

      <nav>
        <ul class="nav-links">
          <li><Link class="nav-link" to="/demo">View Demo</Link></li>
          <li><Link class="nav-link" to="/register">Sign Up</Link></li>
          <li><Link class="nav-link" to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
    )
}

export default Navbar;