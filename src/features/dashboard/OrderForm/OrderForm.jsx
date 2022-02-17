import "./OrderForm.css";
import Input from "../../../components/input/input";

const OrderForm = ({
  stockName,
  selectedPrice,
  quantity,
  handleQuantityChange,
}) => {
  return (
    <div className="grid">
      <div>Ticker</div>
      <div>{stockName.toUpperCase()}</div>
      <div>Price </div>
      <div>{selectedPrice.toFixed(2)}</div>
      <div>Quantity</div>
      <Input
        value={quantity}
        inputType="number"
        handleChange={handleQuantityChange}
      />
    </div>
  );
};

export default OrderForm;
