import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Cards from '../../components/Cards/Cards';
import Charts from '../../components/charts/Charts';
import Spinner from '../../components/Spinner';

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: false,
      addedCalories: 0,
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

  //Input change for input element in DailyCaloriesCard
  inputChangeHandler = (e) => {
    this.setState({
      addedCalories:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  //Pass addedCalories to DailyCalories card via props and listen for onClick to execute
  addCaloriesHandler = async (addedCalories) => {
    //When button is clicked in DailyCaloriesCard, update database and state for caloriesConsumedToday and caloriesRemaining today. Create copy of state first so don't mutate it directly. Use spread operator so state still contains everything that is already there (won't replace it with just this).

    const profile = { ...this.state.profile };

    try {
      //Add the addedCalories sent from DailyCaloriesCard component. Make sure caloriesRemainingToday never goes below 0.
      const calories = {
        caloriesConsumedToday: profile.caloriesConsumedToday + addedCalories,
      };

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
    this.setState((prevState) => ({
      profile: {
        ...prevState.profile,
        caloriesConsumedToday: profile.caloriesConsumedToday + addedCalories,
        caloriesRemainingToday:
          profile.caloriesRemainingToday - addedCalories <= 0
            ? 0
            : profile.caloriesRemainingToday - addedCalories,
      },
      addedCalories: 0,
    }));
  };

  //Reset caloriesConsumedToday and caloriesRemaining today when onClick activated from DailyCaloriesCard
  resetCaloriesHandler = async () => {
    const profile = { ...this.state.profile };

    this.setState((prevState) => ({
      profile: {
        ...prevState.profile,
        caloriesConsumedToday: 0,
        caloriesRemainingToday: profile.goalDailyCalories,
      },
    }));

    try {
      const calories = {
        caloriesConsumedToday: 0,
      };

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
  };

  render() {
    return (
      <Fragment>
        <div className='main-content'>
          <div className='dashboard-container'>
            <h1 className='title-white-bold'>Your Dashboard</h1>
            {this.state.isLoading ? (
              <Spinner />
            ) : (
              <Fragment>
                <Cards
                  profile={this.state.profile}
                  inputChangeHandler={this.inputChangeHandler}
                  addCaloriesHandler={this.addCaloriesHandler}
                  addedCalories={this.state.addedCalories}
                  resetCaloriesHandler={this.resetCaloriesHandler}
                />
                <Charts />
              </Fragment>
            )}
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
