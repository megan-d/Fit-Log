import React, { Fragment } from 'react';
import Navbar from '../components/layout/Navbar';
import Runner from '../assets/images/lady-running-cover.svg';
import Line from '../assets/images/Line.svg';

const Landing = () => {
  //Need to figure out how to not display footer on landing page
  return (
    <Fragment>
      
      < Navbar />
      <div className='main-content'>
      <section className='main-section'>
        <div className='left-wrapper'>
          <h1 className='title-landing'>Achieve Your Fitness Goals</h1>
          <h2 className='subtitle-landing'>
            Activity tracking and exercise resources to help you reach your
            fitness goals
          </h2>
          <a href='/register' className='button'>
            Join Now
          </a>
          <img className='image-line' src={Line} alt='line' />
        </div>

        <div className='image-container'>
          <img src={Runner} alt='woman running' />
        </div>
      </section>
    </div>
    </Fragment>
    
  );
};

export default Landing;
