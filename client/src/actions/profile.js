import axios from 'axios';
import { setAlert } from './alert';
import {
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  PROFILE_CLEARED,
  USER_DELETED
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
    if (updates.hasOwnProperty('caloriesConsumedToday')) {
      dispatch(setAlert('Calories updated', 'success'));
    } else {
      dispatch(setAlert('Profile updated', 'success'));
    }

    // //redirect to dashboard unless the calories was the card updated. Might need to change this when do modal.
    // if (!updates.hasOwnProperty('caloriesConsumedToday')) {
    //   history.push('/dashboard');
    // }
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

//Add an activity
export const addActivity = (activity, history) => async (dispatch) => {
  try {
    //Create config with headers. Get token from localStorage and put in req header.
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    //Stringify data sent from AddActivity component for the body to send to db
    const body = JSON.stringify(activity);

    //Make PUT request to api/profile
    const res = await axios.put('api/profile/activity', body, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Activity added', 'success'));

    history.push('/dashboard');
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

//Delete an activity by activity id
export const deleteActivity = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/activity/${id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Activity removed', 'success'));
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

//Delete profile and user
export const deleteUser = () => async(dispatch) => {
  try {
    //Confirm that user wants to delete

    await axios.delete('api/profile', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    dispatch({
      type: PROFILE_CLEARED
    });
    dispatch({
      type: USER_DELETED
    });
    dispatch(setAlert('Your profile and account have been permanently deleted.', 'success'));
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

// ****ACTIONS FOR DEMO*******
// ---------------------------------------

//Create new DEMO profile
export const createDemoProfile = (profile) => async (dispatch) => {
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
    const res = await axios.post('api/profile/demo', body, config);

    dispatch({
      type: LOAD_PROFILE_SUCCESS,
      payload: res.data,
    });
    // getCurrentUserProfile();
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