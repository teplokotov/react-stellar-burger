import React from 'react';
import { useAppDispatch, useAppSelector } from '../../services/types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CLOSE_MODAL } from '../../services/actions/modal';
import { useNavigate, useParams } from 'react-router-dom';

interface IModalProps {
  children: React.ReactNode;
}

function Modal({ children }: IModalProps) {

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isHidden } = useAppSelector((store) => store.modal);
  const { typeOfModal } = useAppSelector((store) => store.modal);

  function handleOnClose() {
    dispatch({ type: CLOSE_MODAL });
    (typeOfModal === 'ingredient' || typeOfModal === 'orderInfo') && navigate(-1);
  }

  const heading = typeOfModal === 'ingredient' ? 'Детали ингредиента' : '';

  // Closing Modal window by pressing ESC
  React.useEffect(() => {
    if (isHidden) return; // When the popup is closed, it stops the effect (so as not to add a handler)
    function pressEsc(e: KeyboardEvent) {
      if(e.key === 'Escape') {
        dispatch({ type: CLOSE_MODAL });
        (typeOfModal === 'ingredient' || typeOfModal === 'orderInfo') && navigate(-1);
      };
    };
    document.addEventListener('keydown', pressEsc);
    return () => {
      document.removeEventListener('keydown', pressEsc);
    };
  }, [dispatch, isHidden, navigate, typeOfModal]);

  return createPortal(
    <>
      <ModalOverlay isHidden={isHidden} onClose={handleOnClose} />
      <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10 ${!isHidden && modalStyles.show}`}>
        <section className={modalStyles.header}>
          {
            id && typeOfModal === 'orderInfo' ?
              <p className='text text_type_digits-default'>#{id}</p> :
              <h3 className={`${modalStyles.heading} text text_type_main-large pr-10`}>{heading}</h3>
          }
          <button className={modalStyles.button} onClick={handleOnClose}>
            <CloseIcon type="primary" />
          </button>
        </section>
        {children}
      </div>
    </>,
    document.getElementById("modals") as Element
  );
};

export default Modal;
