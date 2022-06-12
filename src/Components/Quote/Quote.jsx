import React, { useState, useEffect, useRef } from "react";
import ReactTooltip from "react-tooltip";
import numberFormat from "../../util";
import "./quote.css";

const Quote = ({ quote, type }) => {
  const quoteMap = {
    sell: {
      textColor: "sell-text",
      backgroundColor: "sell-quote",
      mainTotalIndex: 0,
      quoteStartingIndex: quote.length - 1,
      rowFlashClass: "flash-red",
    },
    buy: {
      textColor: "buy-text",
      backgroundColor: "buy-quote",
      mainTotalIndex: quote.length - 1,
      quoteStartingIndex: 0,
      rowFlashClass: "flash-green",
    },
  };

  const [total, setTotal] = useState(null);
  const quoteItemRef = useRef([]);
  const prevQuote = useRef();
  const flashClass = quoteMap[type].rowFlashClass;

  const handleHoverBackgroundColor = (index, color) => {
    quoteItemRef.current[index].style.backgroundColor = color;
  };

  const onMouseEnter = (index) => {
    let maxIndex = Math.max(index, quoteMap[type].quoteStartingIndex);
    let minIndex = Math.min(index, quoteMap[type].quoteStartingIndex);
    const bgColorOnHover = "#334573";

    while (minIndex <= maxIndex) {
      handleHoverBackgroundColor(minIndex, bgColorOnHover);
      handleHoverBackgroundColor(maxIndex, bgColorOnHover);

      minIndex++;
      maxIndex--;
    }
  };

  const onMouseLeave = () => {
    let minIndex = 0;
    let maxIndex = quoteItemRef.current.length - 1;

    while (minIndex <= maxIndex) {
      handleHoverBackgroundColor(minIndex, "");
      handleHoverBackgroundColor(maxIndex, "");
      minIndex++;
      maxIndex--;
    }
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

  const handleSize = (currentRow, index) => {
    const oldQuote = prevQuote.current;

    if (!oldQuote) {
      return;
    }

    const result = Number(currentRow.size) - Number(oldQuote.quote[index].size);

    if (result === 0) {
      return "";
    }
    return result > 0 ? "flash-red" : "flash-green";
  };

  const quoteData = quote.map((q, index) => {
    const price = numberFormat(q.price);
    const size = numberFormat(q.size);
    const currentTotal = numberFormat(`${q.total}`);
    const accumulativeBar = (q.total / total) * 100;
    const averageSum = numberFormat((totalPrice() / q.total).toFixed(2));
    const totalValue = numberFormat((+q.price * +q.size).toString());
    const tooltip = `Avg Price: ${averageSum} USD <br />Total Value: ${totalValue} USD`;
    const flashValue = flash(q, index);
    const sizeClass = handleSize(q, index);

    return (
      <div
        data-tip={tooltip}
        key={index}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        className={`quote-row  ${flashValue ? flashClass : ""}`}
        ref={(element) => (quoteItemRef.current[index] = element)}
      >
        <div className={`quote-row-item ${quoteMap[type].textColor}`}>
          {price}
        </div>
        <div className={`quote-row-item ${sizeClass}`}>{size}</div>
        <div className="quote-row-item  accumulative">
          <div> {currentTotal}</div>
          <div
            className={`accumulative-shadow ${quoteMap[type].backgroundColor}`}
            style={{
              width: `${accumulativeBar}%`,
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
    const totalIndex = quoteMap[type].mainTotalIndex;
    const total = quote[totalIndex].total;

    setTotal(total);

    return () => {
      prevQuote.current = { quote, type };
    };
  }, [quote]);

  return <div className="quote">{quoteData}</div>;
};

export default Quote;
