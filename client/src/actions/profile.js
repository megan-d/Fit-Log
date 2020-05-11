import axios from 'axios';
import { setAlert } from './alert';
import {
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from './types';

//Get logged in user's profile
export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    const res = await axios.get('/api/profile/me', config);

    dispatch({
      type: LOAD_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_PROFILE_FAILURE,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

//Create new profile
export const createProfile = (profile, history) => async (dispatch) => {
  try {
    //Create config with headers. Get token from localStorage and put in req header.
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    //Create body variable and stringify
    const body = JSON.stringify(profile);

    //Make post request to api/profile.
    const res = await axios.post('api/profile', body, config);

    dispatch({
      type: LOAD_PROFILE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Profile created', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      //if errors, loop through them and dispatch the setAlert
      errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
    }
    dispatch({
      type: LOAD_PROFILE_FAILURE,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

//Update profile
export const updateProfile = (updates, history) => async (dispatch) => {
  try {
    //Create config with headers. Get token from localStorage and put in req header.
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    //Stringify data sent from UpdateStats component for the body to send to db
    const body = JSON.stringify(updates);
    

    //Make PUT request to api/profile
    const res = await axios.put('api/profile', body, config);
    

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });

    //for calories updates, dispatch alert of 'calories updated'. For stats and goals, dispatch alert of 'profile updated.'
    if(updates.hasOwnProperty('caloriesConsumedToday')) {
      dispatch(setAlert('Calories updated', 'success'));
    } else {
      dispatch(setAlert('Profile updated', 'success'));
    }
    

    //redirect to dashboard unless the calories was the card updated. Might need to change this when do modal.
    if(!updates.hasOwnProperty('caloriesConsumedToday')) {
      history.push('/dashboard');
    }
      
    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      //if errors, loop through them and dispatch the setAlert
      errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
    }
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: {
        msg: err.response,
        status: err.response.status,
      },
    });
  }
};

//BELOW THIS IS TAKEN FROM OLD CODE PRIMARILY - WILL NEED TO UPDATE

//Pass addedCalories to DailyCalories card via props and listen for onClick to execute
// export const addCalories = (addedCalories) => async dispatch => {
//     //When button is clicked in DailyCaloriesCard, update database and state for caloriesConsumedToday and caloriesRemaining today. Create copy of state first so don't mutate it directly. Use spread operator so state still contains everything that is already there (won't replace it with just this).

//     try {
//       //Add the addedCalories sent from DailyCaloriesCard component. Make sure caloriesRemainingToday never goes below 0.
//       const calories = {
//         caloriesConsumedToday: profile.caloriesConsumedToday + addedCalories,
//       };

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-access-token': localStorage.getItem('token'),
//         },
//       };

//       const body = JSON.stringify(calories);

//       await axios.put('/api/profile', body, config);

//       dispatch({
//         type: UPDATE_PROFILE_SUCCESS,
//         payload: res.data
//       })

//     } catch (err) {
//         dispatch({
//             type: UPDATE_PROFILE_FAILURE,
//             payload: {
//                 msg: err.response.data.msg,
//                 status: err.response.status
//             }
//           })
//     }
//     this.setState((prevState) => ({
//       profile: {
//         ...prevState.profile,
//         caloriesConsumedToday: profile.caloriesConsumedToday + addedCalories,
//         caloriesRemainingToday:
//           profile.caloriesRemainingToday - addedCalories <= 0
//             ? 0
//             : profile.caloriesRemainingToday - addedCalories,
//       },
//       addedCalories: 0,
//     }));
//   };

//   //Reset caloriesConsumedToday and caloriesRemaining today when onClick activated from DailyCaloriesCard
//   const resetCaloriesHandler = async () => {
//     const profile = { ...this.state.profile };

//     this.setState((prevState) => ({
//       profile: {
//         ...prevState.profile,
//         caloriesConsumedToday: 0,
//         caloriesRemainingToday: profile.goalDailyCalories,
//       },
//     }));

//     try {
//       const calories = {
//         caloriesConsumedToday: 0,
//       };

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-access-token': localStorage.token,
//         },
//       };

//       const body = JSON.stringify(calories);

//       await axios.put('/api/profile', body, config);
//     } catch (err) {
//       console.error(err);
//     }
//   };
