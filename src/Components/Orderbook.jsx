import React from "react";
import Quote from "./Quote";
import "./orderbook.css";

const Orderbook = ({ orders }) => {
  console.log(orders);

  return (
    <div className="orderbook">
      <Quote />
    </div>
  );
};

export default Orderbook;
