import React from 'react';

const Modal = ({ show, children }) => (
  <div className={show ? 'modal-on' : 'modal-off'}>
    <div className='modal'>{children}</div>
  </div>
);

export default Modal;
