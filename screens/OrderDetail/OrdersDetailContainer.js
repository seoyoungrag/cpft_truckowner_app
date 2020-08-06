import React, { useEffect, useState } from "react";
import OrdersDetailPresenter from "./OrdersDetailPresenter";
import { orderApi } from "../../api";

export default ({
 navigation,
 route: {
  params: { orderSeq },
 },
}) => {
 const [orderProp, setOrder] = useState({
  loading: true,
  order: null,
  orderError: null,
 });
 const getData = async () => {
  const [order, orderError] = await orderApi.order(orderSeq);
  setOrder({
   loading: false,
   order,
   orderError,
  });
 };
 useEffect(() => {
  getData();
 }, []);

 return <OrdersDetailPresenter refreshFn={getData} {...orderProp} />;
};
