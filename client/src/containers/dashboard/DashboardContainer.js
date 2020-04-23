import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        caloriesConsumedToday: 0,
        caloriesRemainingToday: 0,
        activities: [],
      },
      weightInput: 0,
    };
    this.addCalories.bind(this);
    this.sendToDatabase.bind(this);
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
        caloriesConsumedToday: profile.data.caloriesConsumedToday,
        caloriesRemainingToday: profile.data.caloriesRemainingToday,
        activities: profile.data.activities,
      },
    });
    console.log(this.state);
  }

  inputCalories = (e) => {
    this.setState({
      weightInput:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  addCalories = () => {
    //When button is clicked, get current value from state for weightInput and add to current value of state for caloriesConsumedToday. Update state for caloriesConsumedToday and caloriesRemaining today.
    if (this.state.profile.caloriesRemainingToday > 0) {
      this.setState((prevState) => ({
        profile: {
          ...prevState.profile,
          caloriesConsumedToday:
            prevState.profile.caloriesConsumedToday + this.state.weightInput,
          caloriesRemainingToday:
            prevState.profile.caloriesRemainingToday - this.state.weightInput,
        },
      }));
    } else {
      this.setState((prevState) => ({
        profile: {
          ...prevState.profile,
          caloriesConsumedToday:
            prevState.profile.caloriesConsumedToday + this.state.weightInput,
          caloriesRemainingToday: 0,
        },
      }));
    }
  };

  sendToDatabase = async () => {
    //Update the caloriesConsumedToday and caloriesRemainingToday in database - need to figure out how to do this to get updated state information sent
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
      },
    };
    const calories = {
      caloriesConsumedToday: this.state.caloriesConsumedToday,
      caloriesRemainingToday: this.state.caloriesRemainingToday,
    };

    const body = JSON.stringify(calories);

    try {
      await axios.put('/api/profile', body, config);
    } catch (err) {
      console.error(err);
    }
  };

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
              <div className='card'>
                <h2 className='card-title'>Daily Calories Tracker</h2>
                <div className='card-stats'>
                  <div className='card-item'>
                    <p className='card-label'>Calories Consumed:</p>
                    <p className='card-value'>
                      {this.state.profile.caloriesConsumedToday}
                    </p>
                  </div>
                  <div className='card-item'>
                    <p className='card-label'>Calories Remaining:</p>
                    <p className='card-value'>
                      {this.state.profile.caloriesRemainingToday < 0
                        ? 0
                        : this.state.profile.caloriesRemainingToday}
                    </p>
                  </div>
                </div>
                <div className='card-item calories-input'>
                  <input
                    className='card-input'
                    type='number'
                    name='weightInput'
                    value={this.state.weightInput}
                    onChange={(e) => this.inputCalories(e)}
                  ></input>
                  <button
                    className='card-button'
                    onClick={() => this.addCalories()}
                  >
                    Add Calories
                  </button>
                </div>
              </div>
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
