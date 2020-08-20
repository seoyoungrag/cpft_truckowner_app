import React, { useEffect, useState } from "react";
import TransDetailPresenter from "./TransDetailPresenter";
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
   workMinuteEnd,
   detailMatter,
   workDays,
   year,
   month,
   tmpKey,
  },
 },
}) => {
 console.log(tmpKey);
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
   workMinuteEnd,
   detailMatter,
   workDays,
   tmpKey,
  },
  year,
  month,
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
    detailMatter: getOrder.detailMatter,
    workDays: getOrder.workDays,
    tmpKey,
   },
   year,
   month,
   orderError: getOrderError,
  });
 };
 useEffect(() => {
  getData();
 }, [orderSeq]);
 return <TransDetailPresenter refreshFn={getData} {...orderProp} />;
};
