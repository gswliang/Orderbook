import React, { useEffect } from "react";
import numberFormat from "../../util";
import "./quote.css";

const Quote = ({ quote, type }) => {
  const quoteData = quote.map((q, index) => {
    const price = numberFormat(q.price);
    const size = numberFormat(q.size);
    const total = numberFormat(`${q.total}`);

    return (
      <tr key={index}>
        <td>{price}</td>
        <td>{size}</td>
        <td>{total}</td>
      </tr>
    );
  });

  return (
    <div className="quote">
      <table>
        <tbody>{quoteData}</tbody>
      </table>
    </div>
  );
};

export default Quote;
