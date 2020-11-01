import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT,
  PROFILE_CLEARED,
} from './types';
import { displayAlert } from './alert';

//****LOGIN USER ACTION */
export const login = (user) => async (dispatch) => {
  //Set header in config.
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Create body and stringify user object
  const data = {
    email: user.email,
    password: user.password,
  };
  const body = JSON.stringify(data);

  try {
    //Post request to api/auth
    const res = await axios.post('/api/auth', body, config);

    const token = res.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    //If errors, get array of errors and loop through them and dispatch setAlert
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(displayAlert(error.msg, 'warning')));
    }
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

//****REGISTER USER ACTION */
export const register = (user) => async (dispatch) => {
  //Create config with headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //Create body and stringify user object
  const data = {
    name: user.name,
    email: user.email,
    password: user.password,
  };
  const body = JSON.stringify(data);

  try {
    //Axios will return promise with response in route to add new user (should return a token)
    const res = await axios.post('/api/users', body, config);

    const token = res.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    //If errors, get array of errors and loop through them and dispatch setAlert
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(displayAlert(error.msg, 'warning')));
    }
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

//****LOAD USER ACTION */
//This is to address if the user already has a valid token and comes to the page, and will also run after login and registration so the state is populated with the user's information.
export const loadUser = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    const res = await axios.get('/api/auth', config);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: res.data.rows[0],
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAILURE,
    });
  }
};

//Logout User
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: PROFILE_CLEARED,
  });
};
