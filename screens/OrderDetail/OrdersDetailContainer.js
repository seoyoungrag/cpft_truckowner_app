import React, { useEffect, useState } from "react";
import OrdersDetailPresenter from "./OrdersDetailPresenter";
import { orderApi } from "../../api";

export default ({
 navigation,
 route: {
  params: {
   orderSeq,
   opratSctn,
   workArea,
   rcritType,
   carTypes,
   tonType,
   dlvyPrdlst,
   salary,
   expensYn,
   workHourStart,
   workMinuteStart,
   workHourEnd,
   workMinuteEnd,
   detailMatter,
   workDays,
  },
 },
}) => {
 const [orderProp, setOrder] = useState({
  loading: true,
  order: {
   orderSeq,
   opratSctn,
   workArea,
   rcritType,
   carTypes,
   tonType,
   dlvyPrdlst,
   salary,
   expensYn,
   workHourStart,
   workMinuteStart,
   workHourEnd,
   workMinuteEnd,
   detailMatter,
   workDays,
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
    workArea: getOrder.workArea,
    rcritType: getOrder.rcritType,
    carTypes: getOrder.carTypes,
    tonType: getOrder.tonType,
    dlvyPrdlst: getOrder.dlvyPrdlst,
    salary: getOrder.salary,
    expensYn: getOrder.expensYn,
    workHourStart: getOrder.workHourStart,
    workMinuteStart: getOrder.workMinuteStart,
    workHourEnd: getOrder.workHourEnd,
    workMinuteEnd: getOrder.workMinuteEnd,
    detailMatter: getOrder.detailMatter,
    workDays: getOrder.workDays,
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
