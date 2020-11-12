import React, { useEffect, useState } from "react";
import TransPresenter from "./TransPresenter";
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

 return <TransPresenter refreshFn={getData} {...orders} />;
};
