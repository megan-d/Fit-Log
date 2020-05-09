import {
  PROFILE_LOADING,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  PROFILE_CLEARED,
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  errors: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_FAILURE:
    case LOAD_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        profile: null,
      };
    case PROFILE_CLEARED:
      return {
        ...state,
        loading: false,
        profile: null,
        errors: {}
      };
    default:
      return state;
  }
}
