import React from 'react';
import Runner from '../../assets/images/lady-running-cover.svg';

const Landing = () => {
  //Need to figure out how to not display footer on landing page
  return (
    <div className='main-content'>
      <section className='main-section'>
        <div className='left-wrapper'>
          <h1 className='title-landing'>
            Visualize Your <span className='fitness'>Fitness</span>
          </h1>
          <h2 className='subtitle-landing'>
            Activity and fitness tracking to help you view your progress and
            reach your fitness goals
          </h2>
          <div className='landing-buttons'>
            <div className='button landing-button'>
              <a href='/demo' className='landing-link'>Demo</a>
            </div>
            <div className='button landing-button'>
              <a href='/register' className='landing-link'>
                Join Now
              </a>
            </div>
          </div>

        </div>

        <div className='image-container'>
          <img src={Runner} alt='woman running' />
        </div>
      </section>
    </div>
  );
};

export default Landing;
