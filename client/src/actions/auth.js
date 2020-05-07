import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from './types';
import { setAlert } from './alert';
import setHeaderAndToken from '../utilities/setHeaderAndToken';

//****LOAD USER ACTION */
// export const loadUser = () => async (dispatch) => {
//   //if there's a token in localStorage, set it in the global header
//   if (localStorage.token) {
//     setHeaderToken(localStorage.token);
//   }
//   try {
//     const res = await axios.get('/api/auth');

//     dispatch({
//       type: LOAD_USER_SUCCESS,
//       payload: res.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOAD_USER_FAILURE,
//     });
//   }
// };

//****LOGIN USER ACTION */
export const login = (user) => async (dispatch) => {
  //Set header in config
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

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    //If errors, get array of errors and loop through them and dispatch setAlert
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
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
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    //If errors, get array of errors and loop through them and dispatch setAlert
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')));
    }
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};
