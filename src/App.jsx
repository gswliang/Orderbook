import React, { useEffect, useState } from "react";
import Orderbook from "./Components/Orderbook/Orderbook";
import "./App.css";

const App = () => {
  const ORDER_BOOK_WEBSOCKET_URL = "wss://ws.btse.com/ws/futures";

  const [orders, setOrders] = useState();

  useEffect(() => {
    const ws = new WebSocket(ORDER_BOOK_WEBSOCKET_URL);
    const subscribe = { op: "subscribe", args: ["orderBook:BTCPFC_0"] };

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
