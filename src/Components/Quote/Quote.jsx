import React, { useState, useEffect, useRef } from "react";
import ReactTooltip from "react-tooltip";
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
  const prevQuote = useRef();
  const flashClass = type === "sell" ? "flash-green" : "flash-red";

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

  const totalPrice = () => {
    let sum = 0;
    quote.forEach((item) => {
      sum += Number(item.price) * Number(item.size);
    });
    return sum;
  };

  const flash = (currentRow, index) => {
    const oldQuote = prevQuote.current;

    return oldQuote ? currentRow.price !== oldQuote.quote[index].price : false;
  };

  const quoteData = quote.map((q, index) => {
    const price = numberFormat(q.price);
    const size = numberFormat(q.size);
    const currentTotal = numberFormat(`${q.total}`);
    const accumulativeBarPercentage = (q.total / total) * 100;
    const averageSum = numberFormat((totalPrice() / q.total).toFixed(2));
    const totalValue = numberFormat((+q.price * +q.size).toString());
    const tooltip = `Avg Price: ${averageSum} USD <br />Total Value: ${totalValue} USD`;
    const flashValue = flash(q, index);

    return (
      <div
        data-tip={tooltip}
        className={`quote-row ${flashValue ? flashClass : ""}`}
        key={index}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        ref={(element) => (quoteItemRef.current[index] = element)}
      >
        <div className={`quote-row-item ${quoteMap[type].textColor}`}>
          {price}
        </div>
        <div className="quote-row-item">{size}</div>
        <div className="quote-row-item  accumulative">
          <div> {currentTotal}</div>
          <div
            className={`accumulative-shadow ${quoteMap[type].backgroundColor}`}
            style={{
              width: `${accumulativeBarPercentage}%`,
            }}
          ></div>
        </div>
        <ReactTooltip
          place="right"
          className="tooltip"
          effect="solid"
          multiline={true}
          backgroundColor="#57626e"
        />
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

    return () => {
      prevQuote.current = { quote, type };
    };
  }, [quote]);

  return <div className="quote">{quoteData}</div>;
};

export default Quote;
