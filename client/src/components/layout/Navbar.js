import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/auth';
import Logo from '../../assets/images/Logo.svg';

const Navbar = ({ logoutUser, auth: { isAuthenticated, loading } }) => {
    const userNav = (
      <ul className="nav-links">
          <li><Link className="nav-link" to="/dashboard">My Dashboard</Link></li>
          <li><a className="nav-link" onClick={logoutUser} href='/'>Logout</a></li>
        </ul>
    );
    
    const guestNav = (
      <ul className="nav-links">
          <li><Link className="nav-link" to="/demo">View Demo</Link></li>
          <li><Link className="nav-link" to="/register">Sign Up</Link></li>
          <li><Link className="nav-link" to="/login">Login</Link></li>
        </ul>
    )


    return(
        <header>
      <div className="logo-container">
        <img src={Logo} alt="logo" id="logo-image"/>
        <h1><Link to="/">Fit Ally</Link></h1>
      </div>

      <nav>
        {!loading && (
          <Fragment >
            {isAuthenticated ? userNav : guestNav }
          </Fragment>
        )}
      </nav>
    </header>
    )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
}
}

export default connect(mapStateToProps, { logoutUser })(Navbar);