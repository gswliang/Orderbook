import React, { useEffect, useState } from "react";
import Orderbook from "./Components/Orderbook";
import data from "./test.json";
import "./app.css";

const App = () => {
  const ORDER_BOOK_WEBSOCKET_URL = "wss://ws.btse.com/ws/futures";

  const webSocket = new WebSocket(ORDER_BOOK_WEBSOCKET_URL);

  const [orders, setOrders] = useState();

  useEffect(() => {
    // const subscribe = { op: "subscribe", args: ["orderBook:BTCPFC_0"] };

    setOrders(data.data);

    // webSocket.onopen = () => {
    //   webSocket.send(JSON.stringify(subscribe));
    //   console.log("Connecting open!");
    // };
    // webSocket.onmessage = (event) => {
    //   const result = JSON.parse(event.data);
    //   console.log(result);
    // };

    // webSocket.onclose = () => {
    //   console.log("Connection Closed");
    // };
    // webSocket.onerror = (err) => {
    //   console.log("Connection error: ", err);
    // };

    return () => {
      // webSocket.close();
    };
  }, [orders]);

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
