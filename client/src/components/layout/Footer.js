import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <footer className='footer'>
      <nav className='footer-nav'>
        <ul>
          <li className='footer-item'>
            <Link className='footer-link' to='/about'>
              About Us
            </Link>
          </li>
          <li className='footer-item'>
            <Link className='footer-link' to='/contact'>
              Contact Us
            </Link>
          </li>
          <li className='footer-item'>
            <a className='footer-link' href='https://www.twitter.com' target='_blank' rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li className='footer-item'>
            <a className='footer-link' href='https://www.instagram.com' target='_blank' rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
