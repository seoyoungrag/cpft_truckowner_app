import React, { useEffect, useState } from "react";
import MyInfoEditPresenter from "./MyInfoEditPresenter";
import { orderApi } from "../../api";

export default ({ navigation, route }) => {
 const [orderProp, setOrder] = useState({
  loading: true,
 });
 const getData = async () => {
  setOrder({
   loading: false,
  });
 };
 useEffect(() => {
  getData();
 }, [navigation]);
 //console.log('ff',orderProp);
 return <MyInfoEditPresenter refreshFn={getData} />;
};
