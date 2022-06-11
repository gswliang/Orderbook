import React, { useState, useEffect } from "react";
import numberFormat from "../../util";
import "./quote.css";

const Quote = ({ quote, type }) => {
  const quoteTypeMap = {
    sell: {
      textColor: "sell-text",
      backgroundColor: "sell-quote",
      indexStart: 0,
    },
    buy: {
      textColor: "buy-text",
      backgroundColor: "buy-quote",
      indexStart: quote.length - 1,
    },
  };

  const [total, setTotal] = useState(null);

  const quoteData = quote.map((q, index) => {
    const price = numberFormat(q.price);
    const size = numberFormat(q.size);
    const currentTotal = numberFormat(`${q.total}`);
    const accumulativeBarPercentage = (q.total / total) * 100;

    return (
      <div className="quote-row" key={index}>
        <div className={`${quoteTypeMap[type].textColor}`}>{price}</div>
        <div>{size}</div>
        <div className="accumulative">
          <div> {currentTotal}</div>
          <div
            className={`accumulative-shadow ${quoteTypeMap[type].backgroundColor}`}
            style={{
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
    const index = quoteTypeMap[type].indexStart;
    const total = quote[index].total;

    setTotal(total);
  }, [quote]);

  return <div className="quote">{quoteData}</div>;
};

export default Quote;
