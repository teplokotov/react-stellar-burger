import React from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay'
import PropTypes from "prop-types";

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
};

function Modal({ children, onClose, isHidden, heading }) {

  // Closing Modal window by pressing ESC
  React.useEffect(() => {
    if (isHidden) return; // When the popup is closed, it stops the effect (so as not to add a handler)
    function pressEsc(e) {
      if(e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', pressEsc);
    return () => {
      document.removeEventListener('keydown', pressEsc);
    };
  }, [onClose, isHidden]);

  return createPortal(
    <>
      <ModalOverlay isHidden={isHidden} onClose={onClose} />
      <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10 ${!isHidden && modalStyles.show}`}>
        <section className={modalStyles.header}>
          <h3 className={`${modalStyles.heading} text text_type_main-large pr-10`}>{heading}</h3>
          <button className={modalStyles.button} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </section>
        {children}
      </div>
    </>,
    document.getElementById("modals")
  );
};

export default Modal;
