import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import TaxInvoicePresenter from "./TaxInvoicePresenter";
import { barobillApi } from "../../api";

export default ({
 navigation,
 route: {
  params: { mgtKey },
 },
}) => {
 const [taxInvoice, setTaxInvoice] = useState({
  loading: true,
  barobillUrl: "",
  taxInvoiceError: null,
 });
 const getData = async () => {
  const [
   getTaxInvoiceUrl,
   getTaxInvoiceUrlError,
  ] = await barobillApi.getTaxInvoicePopUpURLUsingPOST(mgtKey);
  console.log(mgtKey);
  console.log(getTaxInvoiceUrl);
  console.log(getTaxInvoiceUrlError);
  setTaxInvoice({
   loading: false,
   ...getTaxInvoiceUrl,
   url: getTaxInvoiceUrl,
   taxInvoiceError: getTaxInvoiceUrlError,
  });
 };

 useEffect(() => {
  getData();
 }, []);

 return <TaxInvoicePresenter refreshFn={getData} {...taxInvoice} />;
};
