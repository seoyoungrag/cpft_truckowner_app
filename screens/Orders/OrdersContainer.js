import React, { useEffect, useState } from "react";
import OrdersPresenter from "./OrdersPresenter";
import { orderApi } from "../../api";

export default () => {
 const [orders, setOrders] = useState({
  loading: true,
  now: [],
  nowError: null,
 });
 const getData = async () => {
  const [now, nowError] = await orderApi.now("0701");
  setOrders({
   loading: false,
   now: [],
   nowError,
  });
 };
 useEffect(() => {
  getData();
 }, []);

 return <OrdersPresenter refreshFn={getData} {...orders} />;
};
