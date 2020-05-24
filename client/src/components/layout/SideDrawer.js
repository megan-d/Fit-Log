import React from 'react';
import Navbar from './Navbar';

const sideDrawer = (props) => {
    //Toggle classes to open and close nav sidedrawer
    return(
        <div className='sideDrawer'>
            <Navbar />
        </div>
    );
}

export default sideDrawer;