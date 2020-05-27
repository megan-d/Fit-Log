import axios from 'axios';

const setHeader = userId => {
    //Set a global header for the demo profile user
    if(userId) {
        axios.defaults.headers.common['userId'] = userId;
    //If there is not a token already in localStorage, delete the token header 
    } else {
        delete axios.defaults.headers.common['userId'];
    }
}

export default setHeader;