import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

ModalOverlay.propTypes = {
  isHidden: PropTypes.bool.isRequired,
};

function ModalOverlay({ isHidden }) {
  return (
    <div className={`${modalOverlayStyles.overlay} ${!isHidden && modalOverlayStyles.show}`}></div>
  );
};

export default ModalOverlay;
