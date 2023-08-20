import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay'
import PropTypes from "prop-types";
import { CLOSE_MODAL } from '../../services/actions/modal';

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

function Modal({ children }) {

  const dispatch = useDispatch();
  const { isHidden } = useSelector((store) => store.modal);
  const { typeOfModal } = useSelector((store) => store.modal);

  function handleOnClose() {
    dispatch({ type: CLOSE_MODAL });
  }

  const heading = typeOfModal === 'ingredient' ? 'Детали ингредиента' : '';

  // Closing Modal window by pressing ESC
  React.useEffect(() => {
    if (isHidden) return; // When the popup is closed, it stops the effect (so as not to add a handler)
    function pressEsc(e) {
      if(e.key === 'Escape') dispatch({ type: CLOSE_MODAL });
    };
    document.addEventListener('keydown', pressEsc);
    return () => {
      document.removeEventListener('keydown', pressEsc);
    };
  }, [dispatch, isHidden]);

  return createPortal(
    <>
      <ModalOverlay isHidden={isHidden} onClose={handleOnClose} />
      <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10 ${!isHidden && modalStyles.show}`}>
        <section className={modalStyles.header}>
          <h3 className={`${modalStyles.heading} text text_type_main-large pr-10`}>{heading}</h3>
          <button className={modalStyles.button} onClick={handleOnClose}>
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
