import React, { useEffect } from "react";
import "./quote.css";

const Quote = ({ quote, type }) => {
  // useEffect(() => {
  //   if (!quote.length) {
  //     return;
  //   }
  // });

  const quoteData = quote.map((q, index) => {
    return (
      <tr key={index}>
        <td>{q.price}</td>
        <td>{q.size}</td>
        <td>{q.total}</td>
      </tr>
    );
  });

  return (
    <div className="quote">
      <table>
        {/* <thead>
          <tr>
            <th>Price(USD)</th>
            <th>Size</th>
            <th>Total</th>
          </tr>
        </thead> */}
        <tbody>{quoteData}</tbody>
      </table>
    </div>
  );
};

export default Quote;
