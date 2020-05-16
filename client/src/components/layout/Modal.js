import React from 'react';

const Modal = ({ show, children }) => (
  <div className='modal'>
    <div >{children}</div>
  </div>
);

export default Modal;
