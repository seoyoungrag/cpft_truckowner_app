import React, { useEffect, useState } from "react";
import OrdersPresenter from "./OrdersPresenter";
import { orderApi } from "../../api";
import { useCodes } from "../../CodeContext";

export default () => {
 const [orders, setOrders] = useState({
  loading: true,
  now: [],
  nowError: null,
  codes: null,
 });
 const codes = useCodes();
 const getData = async () => {
  const [now, nowError] = await orderApi.now("0701");
  setOrders({
   loading: false,
   now,
   nowError,
   codes,
  });
 };
 useEffect(() => {
  getData();
 }, []);

 return <OrdersPresenter refreshFn={getData} {...orders} />;
};
