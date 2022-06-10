import React, { useEffect, useState } from "react";
import Quote from "../Quote/Quote";
import Lastprice from "../Lastprice/Lastprice";
import "./orderbook.css";

const Orderbook = ({ orders }) => {
  const MAX_QUOTE_SIZE = 8;
  const [buyQuotes, setBuyQuotes] = useState([]);
  const [sellQuotes, setSellQuotes] = useState([]);
  const [lastPrice, setLastPrice] = useState("");
  const [gain, setGain] = useState("");

  const buyQuoteCalculation = () => {
    let total = 0;
    return orders.buyQuote.slice(0, MAX_QUOTE_SIZE).map((quote) => {
      total += parseInt(quote.size);
      return { ...quote, total };
    });
  };

  const sellQuoteCalculation = () => {
    let total = 0;
    return orders.sellQuote
      .slice(-MAX_QUOTE_SIZE)
      .reverse()
      .map((quote) => {
        total += parseInt(quote.size);
        return { ...quote, total };
      })
      .reverse();
  };

  useEffect(() => {
    if (!orders) {
      return;
    }
    setBuyQuotes(buyQuoteCalculation());
    setSellQuotes(sellQuoteCalculation());
    setGain(orders.gain);
    setLastPrice(orders.lastPrice);
  }, [orders]);

  return (
    <div className="orderbook">
      <Quote quote={buyQuotes} type="buy" />
      <Lastprice lastPrice={lastPrice} gain={gain} />
    </div>
  );
};

export default Orderbook;