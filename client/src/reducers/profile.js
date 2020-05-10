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
  isLoading: true,
  errors: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PROFILE_FAILURE:
    case LOAD_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
        profile: null,
      };
    case PROFILE_CLEARED:
      return {
        ...state,
        isLoading: false,
        profile: null,
      };
    default:
      return state;
  }
}
