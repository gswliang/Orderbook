import React, { useEffect, useState, useRef } from "react";
import Orderbook from "./Components/Orderbook/Orderbook";
import data from "./test.json";
import "./app.css";

const App = () => {
  const ORDER_BOOK_WEBSOCKET_URL = "wss://ws.btse.com/ws/futures";

  const ws = new WebSocket(ORDER_BOOK_WEBSOCKET_URL);

  const [orders, setOrders] = useState();

  useEffect(() => {
    const subscribe = { op: "subscribe", args: ["orderBook:BTCPFC_0"] };

    // setOrders(data.data);

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
      console.log("Connecting open!");
    };
    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);
      setOrders(result.data);
    };

    ws.onclose = () => {
      console.log("Connection Closed");
    };
    ws.onerror = (err) => {
      console.log("Connection error: ", err);
    };
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        <div className="title">Order Book</div>
        <Orderbook orders={orders}></Orderbook>
      </div>
    </div>
  );
};

export default App;
