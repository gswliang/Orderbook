import React, { useState, useEffect, useRef } from "react";
import numberFormat from "../../util";
import "./quote.css";

const Quote = ({ quote, type }) => {
  const quoteMap = {
    sell: {
      textColor: "sell-text",
      backgroundColor: "sell-quote",
      totalIndex: 0,
    },
    buy: {
      textColor: "buy-text",
      backgroundColor: "buy-quote",
      totalIndex: quote.length - 1,
    },
  };

  const [total, setTotal] = useState(null);
  const quoteItemRef = useRef([]);

  // const [oldQuote, setOldQuote] = useState([]);

  const onMouseEnter = (index) => {
    if (type === "sell") {
      for (let i = index; i < quote.length; i++) {
        quoteItemRef.current[i].style.backgroundColor = "#334573";
      }
    } else {
      for (let i = 0; i < index; i++) {
        quoteItemRef.current[i].style.backgroundColor = "#334573";
      }
    }
  };

  const onMouseLeave = () => {
    quoteItemRef.current.forEach((i) => (i.style.backgroundColor = ""));
  };

  const quoteData = quote.map((q, index) => {
    const price = numberFormat(q.price);
    const size = numberFormat(q.size);
    const currentTotal = numberFormat(`${q.total}`);
    const accumulativeBarPercentage = (q.total / total) * 100;

    return (
      <div
        className={`quote-row `}
        key={index}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        ref={(element) => (quoteItemRef.current[index] = element)}
      >
        <div className={`${quoteMap[type].textColor}`}>{price}</div>
        <div>{size}</div>
        <div className="accumulative">
          <div> {currentTotal}</div>
          <div
            className={`accumulative-shadow ${quoteMap[type].backgroundColor}`}
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
    const totalIndex = quoteMap[type].totalIndex;
    const total = quote[totalIndex].total;

    setTotal(total);
  }, [quote]);

  return <div className="quote">{quoteData}</div>;
};

export default Quote;
