import React, {useEffect, useState} from "react";
import MyInfoPresenter from "./MyInfoPresenter";
import {orderApi} from "../../api";

export default () => {
	//  const [orders, setOrders] = useState({
	//   loading: true,
	//   truckOwnerOrders: [],
	//   truckOwnerOrdersError: null,
	//  });
	//  const getData = async () => {
	//   const [
	//    truckOwnerOrders,
	//    truckOwnerOrdersError,
	//   ] = await orderApi.truckOwnerOrders("all", "2");
	//   //console.log(truckOwnerOrders);
	//   setOrders({
	//    loading: false,
	//    truckOwnerOrders: [],
	//    truckOwnerOrdersError,
	//   });
	//  };
	//  useEffect(() => {
	//   getData();
	//  }, []);

	return <MyInfoPresenter />;
};
