import React, { useEffect, useState } from "react";
import numberFormat from "../../util";

import "./last-price.css";

const Lastprice = ({ lastPrice, gain }) => {
  const [price, setPrice] = useState(null);
  const [icon, setIcon] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (!lastPrice) {
      return;
    }

    const stateMap = {
      0: { icon: "", background: "" },
      1: { icon: "arrow_upward", background: "#00b15d" },
      "-1": { icon: "arrow_downward", background: "#FF5B5A" },
    };

    setIcon(stateMap[gain].icon);
    setBackgroundColor(stateMap[gain].background);
    setPrice(numberFormat(lastPrice));
  }, [lastPrice, gain]);
  return (
    <div className="Last-price" style={{ backgroundColor: backgroundColor }}>
      {price}
      <span className="material-symbols-outlined icon">{icon}</span>
    </div>
  );
};

export default Lastprice;
