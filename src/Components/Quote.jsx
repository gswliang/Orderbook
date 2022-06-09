import React from "react";
import "./quote.css";

const Quote = () => {
  // replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return (
    <div className="quote">
      <table>
        <thead>
          <tr>
            <th>Price(USD)</th>
            <th>Size</th>
            <th>Total</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Quote;
