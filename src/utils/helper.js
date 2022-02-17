export const areStocksLoaded = (stocks) => {
  return Object.keys(stocks).length > 0;
};

export const newMarketTrend = (up_count, down_count) => {
  if (up_count === down_count) return undefined;
  return up_count > down_count ? "up" : "down";
};

export const getStockValueColor = (stock) => {
  if (stock.current_value < stock.history.slice(-2)[0].value) {
    return "red";
  } else if (stock.current_value > stock.history.slice(-2)[0].value) {
    return "green";
  } else {
    return null;
  }
};
