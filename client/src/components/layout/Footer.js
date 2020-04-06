import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <footer class='footer'>
      <nav class='footer-nav'>
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
            <Link className='footer-link' to='https://www.twitter.com'>
              Twitter
            </Link>
          </li>
          <li className='footer-item'>
            <Link className='footer-link' to='https://www.instagram.com'>
              Instagram
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
