import { queryByPlaceholderText } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import numberFormat from "../../util";
import "./quote.css";

const Quote = ({ quote, type }) => {
  const SELL_COLOR = "#00b15d";
  const BUY_COLOR = "#FF5B5A";
  const textColor = type === "sell" ? SELL_COLOR : BUY_COLOR;
  const [total, setTotal] = useState(null);

  const quoteData = quote.map((q, index) => {
    const price = numberFormat(q.price);
    const size = numberFormat(q.size);
    const currentTotal = numberFormat(`${q.total}`);

    return (
      <div className="table" key={index}>
        <div style={{ color: textColor }}>{price}</div>
        <div>{size}</div>
        <div className="accumulative">{currentTotal}</div>
      </div>
    );
  });

  useEffect(() => {
    if (!quote.length) {
      return;
    }
    const index = type === "sell" ? 0 : quote.length - 1;
    const total = quote[index]?.total;
    setTotal(total);
  }, [quote]);

  return <div className="quote">{quoteData}</div>;
};

export default Quote;
