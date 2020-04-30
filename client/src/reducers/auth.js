import { REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';

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
      localStorage.removeItem('token');
      return {
          ...state,
          token: null,
          isLoading: false,
          isAuthenticated: false
      }
      case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
      case LOGIN_FAILURE:
      localStorage.removeItem('token');
      return {
          ...state,
          token: null,
          isLoading: false,
          isAuthenticated: false
      }
    default:
      return state;
  }
}
