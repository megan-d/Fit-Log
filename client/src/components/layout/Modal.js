import React, { Fragment } from 'react';
import Backdrop from '../layout/Backdrop';

const Modal = ({ show, children, modalClosed }) => (
  <Fragment>
    <Backdrop  show={show} clicked={modalClosed} />
    <div className={show ? 'modal-on' : 'modal-off'}>
      <div className='modal'>{children}</div>
    </div>
  </Fragment>
);

export default Modal;
