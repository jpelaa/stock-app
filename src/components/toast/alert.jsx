import "./alert.css";

const TYPE_TEXT = {
  success: "Success",
};

const Alert = ({ type = "success", message = "", onDismiss }) => {
  return (
    <div className="content">
      <div className={`alert alert-${type} alert-white rounded`}>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
          onClick={onDismiss}
        >
          ×
        </button>
        <div className="icon"></div>
        <strong>{TYPE_TEXT[type]}!</strong> {message}
      </div>
    </div>
  );
};

export default Alert;
