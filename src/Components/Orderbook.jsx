import React, { useEffect } from "react";
import Quote from "./Quote";
import "./orderbook.css";

const Orderbook = ({ orders }) => {
  const MAX_QUOTE_SIZE = 8;
  const buyQuote = () => {
    let total = 0;
    return orders.buyQuote.slice(0, MAX_QUOTE_SIZE).map((quote) => {
      total += +quote.size;

      return { ...quote, total };
    });
  };

  const sellQuote = () => {
    let total = 0;

    return orders.sellQuote
      .reverse()
      .slice(0, MAX_QUOTE_SIZE)
      .map((quote) => {
        total += +quote.size;
        return { ...quote, total };
      });
  };

  useEffect(() => {
    if (!orders) {
      return;
    }
    console.log(orders);
    const buyQuotes = buyQuote();
    const sellQuotes = sellQuote();

    // console.log(buyQuotes);
  });

  return (
    <div className="orderbook">
      <Quote />
    </div>
  );
};

export default Orderbook;
