import "./button.css";

const Button = ({ children, onClick, type = "" }) => {
  return (
    <button
      type="button"
      className={`button button__${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
