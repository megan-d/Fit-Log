import React, { Component } from 'react';
import axios from 'axios';

class DailyCaloriesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Create a state for the input field
      isLoading: true,
      isAuthenticated: false,
      caloriesConsumedToday: 0,
      caloriesRemainingToday: 0,
      weightInput: 0,
    };
    //Probably don't need this because of arrow functions - check on this
    this.addCalories.bind(this);
  }

  //Call to database on component did mount to get the values of calories consumed and calories remaining
  async componentDidMount() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
      },
    };

    const profile = await axios.get('/api/profile/me', config);

    //Update the state with those values
    this.setState({
      isLoading: false,
      isAuthenticated: true,
      caloriesConsumedToday: profile.data.caloriesConsumedToday,
      caloriesRemainingToday: profile.data.caloriesRemainingToday,
    });
}

  inputCalories = (e) => {
    this.setState({
      weightInput:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  addCalories = () => {
    //When button is clicked, update state for caloriesConsumedToday and caloriesRemaining today.
    if (this.state.caloriesRemainingToday > 0) {
      this.setState((prevState) => ({
        ...prevState,
        caloriesConsumedToday:
          prevState.caloriesConsumedToday + this.state.weightInput,
        caloriesRemainingToday:
          prevState.caloriesRemainingToday - this.state.weightInput,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        caloriesConsumedToday:
          prevState.caloriesConsumedToday + this.state.weightInput,
        caloriesRemainingToday: 0,
      }));
    }}

    async componentDidUpdate() {
        try {
            //Update the caloriesConsumedToday and caloriesRemainingToday in database with new state
            const config = {
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.token,
              },
            };
            if (this.state.caloriesRemainingToday >= 0) {
                const calories = {
                    caloriesConsumedToday: this.state.caloriesConsumedToday,
                    caloriesRemainingToday: this.state.caloriesRemainingToday,
                  };
                  const body = JSON.stringify(calories);
                  await axios.put('/api/profile', body, config);
            } else {
                const calories = {
                    caloriesConsumedToday: this.state.caloriesConsumedToday,
                    caloriesRemainingToday: 0,
                }
                const body = JSON.stringify(calories);
                await axios.put('/api/profile', body, config);
            }
          } catch (err) {
            console.error(err);
          }
  };

  render() {
    return (
      <div className='card'>
        <h2 className='card-title'>Daily Calories Tracker</h2>
        <div className='card-stats'>
          <div className='card-item'>
            <p className='card-label'>Calories Consumed:</p>
            <p className='card-value'>{this.state.caloriesConsumedToday}</p>
          </div>
          <div className='card-item'>
            <p className='card-label'>Calories Remaining:</p>
            <p className='card-value'>
              {this.state.caloriesRemainingToday < 0
                ? 0
                : this.state.caloriesRemainingToday}
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
          <button className='card-button' onClick={() => this.addCalories()}>
            Add Calories
          </button>
        </div>
      </div>
    );
  }
}

export default DailyCaloriesCard;
