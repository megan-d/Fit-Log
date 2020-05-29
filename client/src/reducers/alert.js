import { DISPLAY_ALERT, REMOVE_ALERT } from '../actions/types';

//Initial state will be an empty array of alerts
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_ALERT:
      //return array of alerts. Since state is immutable, need to pass existing state with ...state to make sure anything currently in state is carried forward when add something else to state. action.payload will add additional alert to array.
      return [...state, action.payload];
    case REMOVE_ALERT:
      //Return array of all alerts except for the one that matches the payload
      return state.filter((el) => el.id !== action.payload);
    default:
      return state;
  }
}