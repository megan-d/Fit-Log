import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/auth';
import Logo from '../../assets/images/Logo.svg';

const Navbar = ({ logoutUser, auth: { isAuthenticated, isLoading } }) => {
  const [isOpen, toggle] = useState(false);

  const toggleNav = () => toggle(!isOpen);

  const navClass = isOpen ? 'nav-links open' : 'nav-links close';

  return (
    <header>
      <div className='logo-container'>
        <img src={Logo} alt='logo' id='logo-image' />
        <h1>
          <Link to='/'>Fit Ally</Link>
        </h1>
      </div>

      <nav>
        {!isLoading && (
          <Fragment>
            {isAuthenticated ? (
              <Fragment>
                <div className='hamburger' onClick={toggleNav}>
                  <div className='line line1'></div>
                  <div className='line line2'></div>
                  <div className='line line3'></div>
                </div>
                <ul className={navClass}>
                  <li>
                    <Link
                      className='nav-link'
                      to='/dashboard'
                      onClick={toggleNav}
                    >
                      My Dashboard
                    </Link>
                  </li>
                  <li onClick={toggleNav}>
                    <a className='nav-link' onClick={logoutUser} href='/'>
                      Logout
                    </a>
                  </li>
                </ul>
              </Fragment>
            ) : (
              <Fragment>
                <div className='hamburger' onClick={toggleNav}>
                  <div className='line'></div>
                  <div className='line'></div>
                  <div className='line'></div>
                </div>
                <ul className={navClass}>
                  <li  onClick={toggleNav}>
                    <Link className='nav-link' to='/demo'>
                      View Demo
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='nav-link'
                      to='/register'
                      onClick={toggleNav}
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link className='nav-link' to='/login' onClick={toggleNav}>
                      Login
                    </Link>
                  </li>
                </ul>
              </Fragment>
            )}
          </Fragment>
        )}
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
