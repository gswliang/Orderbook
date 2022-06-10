import { queryByPlaceholderText } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import numberFormat from "../../util";
import "./quote.css";

const Quote = ({ quote, type }) => {
  const SELL_COLOR = "#00b15d";
  const BUY_COLOR = "#FF5B5A";
  const ACCUMULATIVE_SELL = "rgba(16, 186, 104, 0.12)";
  const ACCUMULATIVE_BUY = "rgba(255, 90, 90, 0.12)";
  const isSellQuote = type === "sell";

  const textColor = isSellQuote ? SELL_COLOR : BUY_COLOR;
  const [total, setTotal] = useState(null);

  const quoteData = quote.map((q, index) => {
    const price = numberFormat(q.price);
    const size = numberFormat(q.size);
    const currentTotal = numberFormat(`${q.total}`);
    const accumulativeBarPercentage = (q.total / total) * 100;
    const backgroundColor = isSellQuote ? ACCUMULATIVE_SELL : ACCUMULATIVE_BUY;

    return (
      <div className="table" key={index}>
        <div style={{ color: textColor }}>{price}</div>
        <div>{size}</div>
        <div className="accumulative">
          <div> {currentTotal}</div>
          <div
            className="accumulative-shadow"
            style={{
              backgroundColor: backgroundColor,
              width: `${accumulativeBarPercentage}%`,
            }}
          ></div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (!quote.length) {
      return;
    }
    const index = isSellQuote ? 0 : quote.length - 1;
    const total = quote[index]?.total;
    setTotal(total);
  }, [quote]);

  return <div className="quote">{quoteData}</div>;
};

export default Quote;
