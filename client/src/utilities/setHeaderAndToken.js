import axios from 'axios';

const setHeaderAndToken = token => {
    //If there is already a token in localStorage (as checked in App.js for first render and ..... for subsequnt renders), set the token in the header and in localStorage
    if(token) {
        axios.defaults.headers.common['x-access-token'] = token;
        localStorage.setItem('token', token);
    //If there is not a token already in localStorage, delete the token header and remove token
    } else {
        delete axios.defaults.headers.common['x-access-token'];
    }
}

export default setHeaderAndToken;