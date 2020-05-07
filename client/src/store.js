import{ createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

//Initial state here will be empty object. All initial state will be in the reducers.
const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

//Set up a subscription to store token in localStorage and set header. Prevent auth error on initial run.
let currentState = {
   
}

export default store;