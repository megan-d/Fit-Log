import React, { Fragment } from 'react';
import Backdrop from '../layout/Backdrop';

const Modal = ({ show, children, modalClosed }) => (
  <Fragment>
    <Backdrop  show={show} clicked={modalClosed} />
    <div className={show && 'modal'}>
      {children}
    </div>
  </Fragment>
);

export default Modal;
