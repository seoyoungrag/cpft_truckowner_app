import React, { useEffect, useState } from "react";
import { orderApi } from "../../api";
import OrdersPresenter from "./OrdersPresenter";

export default () => {
 const [orders, setOrders] = useState({
  loading: true,
  now: [],
  nowError: null,
 });
 const getData = async () => {
  const [now, nowError] = await orderApi.now("0701");
  console.log("con", now, nowError);
  setOrders({
   loading: false,
   now,
   nowError,
  });
 };
 useEffect(() => {
  getData();
 }, []);

 return <OrdersPresenter refreshFn={getData} {...orders} />;
};
