const Input = ({ placeholder, inputType, handleChange }) => {
  return (
    <input
      placeholder={placeholder}
      className="input"
      type={inputType}
      onChange={handleChange}
    />
  );
};

export default Input;
