import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DailyCaloriesCard from '../../components/DailyCaloriesCard';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: null,
      profile: {
        user: '',
        weight: null,
        height: null,
        bmi: null,
        goalWeight: null,
        goalDailyCalories: 0,
        goalDays: 0,
        activities: [],
        caloriesConsumedToday: 0,
        caloriesRemainingToday: 0,
      },
    };
  }

  //Fetch the user data here and set the state with the user data (api request to /api/profile/me). The api response will be the profile object, which can then be added to state.
  async componentDidMount() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
      },
    };

    const profile = await axios.get('/api/profile/me', config);

    this.setState({
      isLoading: false,
      isAuthenticated: true,
      profile: {
        user: profile.data.user,
        weight: profile.data.weight,
        height: profile.data.height,
        bmi: profile.data.bmi,
        goalWeight: profile.data.goalWeight,
        goalDailyCalories: profile.data.goalDailyCalories,
        goalDays: profile.data.goalDays,
        activities: profile.data.activities,
        caloriesConsumedToday: profile.data.caloriesConsumedToday,
        caloriesRemainingToday: profile.data.caloriesRemainingToday,
      },
    });
  }

  //When user clicks submit button, update state and send caloriesConsumedToday + addedCalories to the database
  addCalories = (addedCalories) => {
    //When button is clicked, update state for caloriesConsumedToday and caloriesRemaining today. Create copy of state first so don't mutate it directly. Use spread operator so state still contains everything that is already there (won't replace it with just this).
    
    const profile = {...this.state.profile};
    profile.caloriesConsumedToday = profile.caloriesConsumedToday + addedCalories;
    profile.caloriesRemainingToday = profile.caloriesRemainingToday - addedCalories;
    this.setState({profile});
  };

  async componentDidUpdate() {
    const calories = {
      caloriesConsumedToday: this.state.profile.caloriesConsumedToday,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.token,
        },
      };

      const body = JSON.stringify(calories);

      await axios.put('/api/profile', body, config);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Fragment>
        <div className='main-content'>
          <div className='dashboard-container'>
            <h1 className='title-white-bold'>Your Dashboard</h1>
            <div className='cards'>
              <div className='card'>
                <h2 className='card-title'>Stats</h2>
                <div className='card-stats'>
                  <div className='card-item'>
                    <p className='card-label'>Weight:</p>
                    <p className='card-value'>
                      {this.state.profile.weight} lbs
                    </p>
                  </div>
                  <div className='card-item'>
                    <p className='card-label'>Height:</p>
                    <p className='card-value'>{this.state.profile.height} in</p>
                  </div>
                  <div className='card-item'>
                    <p className='card-label'>BMI:</p>
                    <p className='card-value'>{this.state.profile.bmi}</p>
                  </div>
                </div>
                <Link className='card-button' to='/stats'>
                  Update
                </Link>
              </div>
              <div className='card'>
                <h2 className='card-title'>Goals</h2>
                <div className='card-stats'>
                  <div className='card-item'>
                    <p className='card-label'>Weight:</p>
                    <p className='card-value'>
                      {this.state.profile.goalWeight
                        ? this.state.profile.goalWeight
                        : '-'}{' '}
                      lbs
                    </p>
                  </div>
                  <div className='card-item'>
                    <p className='card-label'>Daily Calories:</p>
                    <p className='card-value'>
                      {this.state.profile.goalDailyCalories}
                    </p>
                  </div>
                  <div className='card-item'>
                    <p className='card-label'>Days/Week Exercise:</p>
                    <p className='card-value'>{this.state.profile.goalDays}</p>
                  </div>
                </div>
                <Link className='card-button' to='/stats'>
                  Update
                </Link>
              </div>
              <DailyCaloriesCard
                caloriesConsumedToday={this.state.profile.caloriesConsumedToday}
                caloriesRemainingToday={
                  this.state.profile.caloriesRemainingToday
                }
                addCalories={this.addCalories}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// {/* <div className='charts'>
//             <div className='chart'>Chart 1</div>
//             <div className='chart'>Chart 2</div>
//             <div className='chart'>Chart 3</div>
//           </div>
//           <div className='activity-log-container'>
//             <button>Add Activity</button>
//             <h2>Activity Log</h2>
//             <div className='activity-headings'>
//               <p className='activity-heading'>Date</p>
//               <p className='activity-heading'>Duration</p>
//               <p className='activity-heading'>Category</p>
//               <p className='activity-heading'>Calories Burned</p>
//             </div>
//             <div className='activities'>
//               <div className='activity'>Activity 1</div>
//               <div className='activity'>Activity 2</div>
//             </div> */}
