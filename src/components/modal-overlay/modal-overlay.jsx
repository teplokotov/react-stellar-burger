import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay({ isHidden }) {
  return (
    <div className={`${modalOverlayStyles.overlay} ${!isHidden && modalOverlayStyles.show}`}></div>
  );
};

export default ModalOverlay;
