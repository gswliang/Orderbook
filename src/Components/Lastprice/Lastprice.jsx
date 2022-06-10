import React, { useEffect, useState } from "react";
import numberFormat from "../../util";

import "./last-price.css";

const Lastprice = ({ lastPrice, gain }) => {
  const [price, setPrice] = useState(null);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (!lastPrice || !gain) {
      return;
    }
    setIcon(gain === "-1" ? "arrow-down" : "arrow-up");
    setPrice(numberFormat(lastPrice));
  }, [lastPrice]);
  return <div className="Last-price">{price}</div>;
};

export default Lastprice;
