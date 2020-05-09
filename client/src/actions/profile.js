import axios from 'axios';
import { setAlert } from './alert';
import {
    PROFILE_LOADING,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    PROFILE_CLEARED
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
        payload: res.data
      })
         
    } catch (err) {
            dispatch({
                type: LOAD_PROFILE_FAILURE,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status
                }
              })
     }
}


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