import React from "react";
import { areStocksLoaded } from "../../../utils/helper.js";
import StockRow from "./StockRow/StockRow.jsx";
import "./StocksList.css";

const StocksList = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table__header">Ticker</th>
          <th className="table__header"> Quantity</th>
          <th className="table__header"> Price</th>
          <th className="table__header">Last update</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props.stocks).map((stock_name, index) => {
          let current_stock = props.stocks[stock_name];
          return (
            <StockRow
              key={index}
              stock_name={stock_name}
              stock_data={current_stock}
              handleOrderFormModalOpen={props.handleOrderFormModalOpen}
            />
          );
        })}
        {areStocksLoaded(props.stocks) ? null : (
          <tr>
            <td colSpan="4">No stocks loaded yet!</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StocksList;
