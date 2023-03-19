import React, { useEffect } from 'react';
import { useModal } from '../../context/Modal';
// import './open.css'

function OpenedModal({
  modalComponent, // component to render inside the modal
  onModalClose, // optional: callback function that will be called once the modal is closed
  styleOption
}) {
  const { setModalContent, setOnModalClose } = useModal();

  useEffect(() => {
    setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  }, [modalComponent, onModalClose, setModalContent, setOnModalClose]);

  return (
    <button className={styleOption} style={{ display: 'none' }}></button>
  );
}

export default OpenedModal;
