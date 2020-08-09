import React, { useEffect, useState } from "react";
import OrdersDetailPresenter from "./OrdersDetailPresenter";
import { orderApi } from "../../api";

export default ({
 navigation,
 route: {
  params: {
   orderSeq,
   opratSctn,
   workingArea,
   rcritType,
   carTypes,
   tonType,
   dlvyPrdlst,
   payAmt,
   payFullType,
   workHourStart,
   workMinuteStart,
   workHourEnd,
   workMinuteEnd
  },
 },
}) => {
 const [orderProp, setOrder] = useState({
  loading: true,
  order: {
   orderSeq,
   opratSctn,
   workingArea,
   rcritType,
   carTypes,
   tonType,
   dlvyPrdlst,
   payAmt,
   payFullType,
   workHourStart,
   workMinuteStart,
   workHourEnd,
   workMinuteEnd
  },
  orderError: null,
 });
 const getData = async () => {
  const [getOrder, getOrderError] = await orderApi.order(orderSeq);
  setOrder({
   loading: false,
   order: {
    ...getOrder,
    orderSeq: getOrder.orderSeq,
    opratSctn: getOrder.opratSctn,
    workingArea: getOrder.workingArea,
    rcritType: getOrder.rcritType,
    carTypes: getOrder.carTypes,
    tonType: getOrder.tonType,
    dlvyPrdlst: getOrder.dlvyPrdlst,
    payAmt: getOrder.payAmt,
    payFullType: getOrder.payFullType,
    workHourStart: getOrder.workHourStart,
    workMinuteStart: getOrder.workMinuteStart,
    workHourEnd: getOrder.workHourEnd,
    workMinuteEnd: getOrder.workMinuteEnd,
   },
   orderError: getOrderError,
  });
 };
 useEffect(() => {
  getData();
 }, [orderSeq]);
 //console.log('ff',orderProp);
 return <OrdersDetailPresenter refreshFn={getData} {...orderProp} />;
};
