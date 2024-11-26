// src/Modal.tsx
import React from 'react';
import './Modal.css'; // Создадим CSS файл для стилизации

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // Если модальное окно не открыто, ничего не рендерим

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times; {/* Знак крестика */}
        </button>
        <h2>{message}</h2>
        <button onClick={onClose}>ОК</button>
      </div>
    </div>
  );
};

export default Modal;