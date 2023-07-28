import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

ModalOverlay.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function ModalOverlay({ isHidden, onClose }) {

  // Closing Modal window by clicking on the overlay
  React.useEffect(() => {
    if (isHidden) return;
    function clickOverlay(e) {
      if(e.target.classList.contains(modalOverlayStyles.overlay)) onClose();
    };
    document.addEventListener('click', clickOverlay);
    return () => {
      document.removeEventListener('click', clickOverlay);
    };
  }, [onClose, isHidden]);

  return (
    <div className={`${modalOverlayStyles.overlay} ${!isHidden && modalOverlayStyles.show}`}></div>
  );
};

export default ModalOverlay;
