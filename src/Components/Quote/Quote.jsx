import React, { useState, useEffect, useRef } from "react";
import numberFormat from "../../util";
import "./quote.css";

const Quote = ({ quote, type }) => {
  const [total, setTotal] = useState(null);

  const quoteItemRef = useRef([]);
  const prevQuote = useRef();
  const hoverIndex = useRef(null);

  const quoteSettings = {
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
  const totalIndex = quoteSettings[type].mainTotalIndex;
  const flashClass = quoteSettings[type].rowFlashClass;
  const textColor = quoteSettings[type].textColor;
  const accumulativeBarBgColor = quoteSettings[type].backgroundColor;

  const handleHoverBackgroundColor = (index, color) => {
    quoteItemRef.current[index].style.backgroundColor = color;
  };

  const onMouseEnter = (index) => {
    const quoteTypeIndex = quoteSettings[type].quoteStartingIndex;
    const bgColorOnHover = "#334573";
    let maxIndex = Math.max(index, quoteTypeIndex);
    let minIndex = Math.min(index, quoteTypeIndex);

    while (minIndex <= maxIndex) {
      handleHoverBackgroundColor(minIndex, bgColorOnHover);
      handleHoverBackgroundColor(maxIndex, bgColorOnHover);

      minIndex++;
      maxIndex--;
    }

    hoverIndex.current = index;
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

    hoverIndex.current = null;
  };

  const handleHasRowBackgroundColor = (currentIndex) => {
    if (hoverIndex.current === null) {
      return false;
    }

    const quoteTypeIndex = quoteSettings[type].quoteStartingIndex;
    const maxIndex = Math.max(hoverIndex.current, quoteTypeIndex);
    const minIndex = Math.min(hoverIndex.current, quoteTypeIndex);

    return minIndex <= currentIndex && currentIndex <= maxIndex;
  };

  const sumProduct = (index) => {
    const quoteTypeIndex = quoteSettings[type].quoteStartingIndex;
    const maxIndex = Math.max(index, quoteTypeIndex) + 1;
    const minIndex = Math.min(index, quoteTypeIndex);
    const quoteSlice = quote.slice(minIndex, maxIndex);
    let sum = 0;

    quoteSlice.forEach(
      (item) => (sum += Number(item.price) * Number(item.size))
    );
    return sum;
  };

  const handleRowFlash = (currentRow, index) => {
    const oldQuote = prevQuote.current;

    return oldQuote ? currentRow.price !== oldQuote.quote[index].price : false;
  };

  const handleSizeChangedDisplay = (currentRow, index) => {
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
    const currentTotal = numberFormat(q.total);
    const accumulativeBar = (q.total / total) * 100;
    const averageSum = numberFormat((sumProduct(index) / total).toFixed(2));
    const totalValue = numberFormat(sumProduct(index));
    const tooltipData = `Avg Price: ${averageSum} USD \n Total Value: ${totalValue} USD`;
    const hasBackgroundColor = handleHasRowBackgroundColor(index);
    const isFlash = !hasBackgroundColor && handleRowFlash(q, index);
    const sizeClass = hasBackgroundColor
      ? ""
      : handleSizeChangedDisplay(q, index);

    return (
      <div
        tooltip-data={tooltipData}
        key={index}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        className={`quote-row tooltip ${isFlash ? flashClass : ""}`}
        ref={(element) => (quoteItemRef.current[index] = element)}
      >
        <div className={`quote-row-item ${textColor}`}>{price}</div>
        <div className={`quote-row-item ${sizeClass}`}>{size}</div>
        <div className="quote-row-item  accumulative">
          <div> {currentTotal}</div>
          <div
            className={`accumulative-shadow ${accumulativeBarBgColor}`}
            style={{
              width: `${accumulativeBar}%`,
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

    const total = quote[totalIndex].total;

    setTotal(total);

    return () => {
      prevQuote.current = { quote };
    };
  }, [quote, totalIndex]);

  return <div className="quote">{quoteData}</div>;
};

export default Quote;
