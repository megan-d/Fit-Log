import axios from 'axios';

const setHeader = token => {
    //If there is already a token in localStorage (as checked in App.js for first render and ..... for subsequnt renders), set the token in the header
    if(token) {
        axios.defaults.headers.common['x-access-token'] = token;
    //If there is not a token already in localStorage, delete the token header 
    } else {
        delete axios.defaults.headers.common['x-access-token'];
    }
}

export default setHeader;