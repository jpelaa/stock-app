import Button from "../button/button";
import "./modal.css";

const Modal = ({
  children,
  title,
  onclose,
  onConfirm,
  confirmText,
  closeText,
}) => {
  return (
    <div className="modal__content-container" tabIndex="-1">
      <section className="modal__content" role="dialog" tabIndex="-1">
        <header className="modal__header">
          {title ? title : "Modal Title"}
        </header>
        <button
          type="button"
          aria-label="Close"
          className="modal__close-btn"
          onClick={onclose}
        >
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            className="icon"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
            ></path>
          </svg>
        </button>
        <div className="modal__body">{children}</div>
        <footer className="modal__footer">
          <Button onClick={onclose}> {closeText || "Close"}</Button>
          <Button type="primary" onClick={onConfirm}>
            {confirmText || "Confirm"}
          </Button>
        </footer>
      </section>
    </div>
  );
};

export default Modal;
