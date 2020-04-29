//ROOT REDUCER

import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';

//combine all reducers into one root reducer
export default combineReducers({
  auth,
  alert,
});
