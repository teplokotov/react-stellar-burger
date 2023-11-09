import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface ModalOverlayProps {
  isHidden: boolean,
  onClose: () => void,
}

function ModalOverlay({ isHidden, onClose }: ModalOverlayProps) {

  // Closing Modal window by clicking on the overlay
  React.useEffect(() => {
    if (isHidden) return;
    function clickOverlay(e: MouseEvent | TouchEvent) {
      const el = e.target as Element;
      if(el.classList.contains(modalOverlayStyles.overlay)) onClose();
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
