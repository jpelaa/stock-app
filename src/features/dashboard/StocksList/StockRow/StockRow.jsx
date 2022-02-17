import React from "react";
import TimeAgo from "react-timeago";
import { getStockValueColor } from "../../../../utils/helper";
import "./StockRow.css";

const StockRow = (props) => {
  const history = props.stock_data.history;
  return (
    <tr
      className={"table__row "}
      id={props.stock_name}
      onClick={() => props.handleOrderFormModalOpen(props.stock_name)}
    >
      <td className="table__grid">{props.stock_name.toUpperCase()}</td>
      <td className="table__grid">{props.stock_data.quantity || "--"}</td>
      <td className={"table__grid " + getStockValueColor(props.stock_data)}>
        {props.stock_data.current_value.toFixed(2)}
      </td>
      <td className="table__grid">
        <TimeAgo date={history.slice(-1)[0].time} />
      </td>
    </tr>
  );
};

export default StockRow;
