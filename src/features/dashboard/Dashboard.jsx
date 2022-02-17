import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/modal/modal.jsx";
import { useToasts } from "../../components/toast/toast-manager.jsx";
import { stocksUrl, TOAST_TYPES } from "../../static/common.js";
import { newMarketTrend } from "../../utils/helper.js";
import OrderForm from "./OrderForm/OrderForm.jsx";
import StocksList from "./StocksList/StocksList.jsx";

const Dashboard = () => {
  const [stocks, setStocks] = useState({});
  const [marketTrend, setMarketTrend] = useState(null);
  const [connectionError, setConnectError] = useState(false);
  const [isLoading, setLoadingStatus] = useState(true);

  const [isOrderFormModalOpen, setOrderFormModalOpen] = useState(false);
  const [currentSelectedStock, setCurrentSelectedStock] = useState({});
  const [quantity, setQuantity] = useState(null);

  const saveNewStockValues = (event) => {
    setLoadingStatus(false);
    let result = JSON.parse(event.data);
    let [up_values_count, down_values_count] = [0, 0];

    let current_time = Date.now();
    let new_stocks = { ...stocks };
    result.forEach((stock) => {
      if (stocks[stock[0]]) {
        new_stocks[stock[0]].current_value > Number(stock[1])
          ? up_values_count++
          : down_values_count++;

        new_stocks[stock[0]].current_value = Number(stock[1]);
        new_stocks[stock[0]].history = [
          {
            time: current_time,
            value: Number(stock[1]),
          },
        ];
      } else {
        new_stocks[stock[0]] = {
          ...new_stocks[stock[0]],
          current_value: stock[1],
          history: [{ time: Date.now(), value: Number(stock[1]) }],
        };
      }
    });
    setStocks(new_stocks);
    setMarketTrend(newMarketTrend(up_values_count, down_values_count));
  };

  const ws = useRef(null);
  const { add } = useToasts();

  useEffect(() => {
    ws.current = new WebSocket(stocksUrl);
    ws.current.onmessage = (event) => saveNewStockValues(event);
    ws.current.onclose = () => {
      setConnectError(true);
    };

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  const handleOrderFormModalOpen = (stockName) => {
    setOrderFormModalOpen(true);
    const selectedStock = stocks[stockName];
    setCurrentSelectedStock({
      stockName,
      selectedPrice: selectedStock.current_value,
    });
  };

  const handleClose = () => {
    setOrderFormModalOpen(false);
    setCurrentSelectedStock({});
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = () => {
    const currentPrice = stocks[currentSelectedStock.stockName].current_value;
    const oldPrice = currentSelectedStock.selectedPrice;
    if (currentPrice <= oldPrice) {
      setStocks({
        ...stocks,
        [currentSelectedStock.stockName]: {
          ...stocks[currentSelectedStock.stockName],
          quantity,
        },
      });
      add({
        type: TOAST_TYPES.success,
        message: "Order confirmed ",
      });
    } else {
      add({
        type: TOAST_TYPES.danger,
        message: "Price has changed. check the price ",
      });
    }
    setOrderFormModalOpen(false);
    setQuantity(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (connectionError) {
    return <p>Please try again after some time </p>;
  }

  return (
    <div className="container center">
      {isOrderFormModalOpen && (
        <Modal
          title="Order Form"
          onclose={handleClose}
          onConfirm={handleSubmit}
          confirmText="Place Order"
        >
          <OrderForm
            stockName={currentSelectedStock.stockName}
            selectedPrice={currentSelectedStock.selectedPrice}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
          />
        </Modal>
      )}
      <div className="stocker_box center flex-direction">
        <div className="header">
          <h2>Stockers List </h2>
        </div>
        <div className="columns">
          <StocksList
            stocks={stocks}
            marketTrend={marketTrend}
            handleOrderFormModalOpen={handleOrderFormModalOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
