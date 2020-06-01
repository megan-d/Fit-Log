import React from 'react';
import Runner from '../../assets/images/lady-running-cover.svg';
import Line from '../../assets/images/Line.svg';

const Landing = () => {
  //Need to figure out how to not display footer on landing page
  return (
      <div className='main-content'>
      <section className='main-section'>
        <div className='left-wrapper'>
          <h1 className='title-landing'>Visualize Your <span className='fitness'>Fitness</span></h1>
          <h2 className='subtitle-landing'>
            Activity and fitness tracking to help you view your progress and reach your fitness goals
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
    
  );
};

export default Landing;
