"use client";

import { useEffect } from "react";

const Modal = ({
  message,
  btnActionName,
  setModalOpen,
  modalOpen,
  btnAction,
}) => {
  const modalClose = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {btnActionName}
            </h5>
            <button
              id="modal-x-close-btn"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              id="modal-btn-close"
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={btnAction}
              data-bs-dismiss="modal"
            >
              {btnActionName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
