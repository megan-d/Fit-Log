import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
      localStorage.removeItem('token', action.payload.token);
      return {
          ...state,
          token: null,
          isLoading: false,
          isAuthenticated: false
      }
    default:
      return state;
  }

  // const token = action.payload.token;
  //Set the token in localstorage
  //   if (token) {
  //     localStorage.setItem('token', token);
  //     //set the default header which will be sent with every request made
  //     // axios.defaults.headers.common['x-access-token'] = token;

  //     //NEED TO REDIRECT TO CREATE PROFILE PAGE
  //   } else {
  //     localStorage.removeItem('token');
  //   }
}
