import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAILURE } from './types';
import { setAlert } from './alert';

//****LOAD USER ACTION */

//****REGISTER USER ACTION */
export const register = (user) => async (dispatch) => {
  //Create config with headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //Create body and stringify user object
  const body = {
      name: user.name, 
      email: user.email, 
      password: user.password,
  }
  JSON.stringify(body);
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
