import React, { useState, useEffect } from "react";
import FilterPresenter from "./FilterPresenter";
import { Text } from "react-native";

export default ({
 navigation,
 route: {
  params: {
   filterBtnSelected1,
   filterBtnSelectedAll1,
   filterBtnSelected2,
   filterBtnSelectedAll2,
   filterBtnSelected3,
   filterBtnSelectedAll3,
  },
 },
}) => {
 const [filters, setFilters] = useState({
  loading: true,
  filterBtnSelected1,
  filterBtnSelectedAll1,
  filterBtnSelected2,
  filterBtnSelectedAll2,
  filterBtnSelected3,
  filterBtnSelectedAll3,
  filterBtnSelected4: [],
  filterBtnSelectedAll4: true,
  filterBtnSelected5: [],
  filterBtnSelectedAll5: true,
  filterBtnSelected6: [],
  filterBtnSelectedAll6: true,
  filterBtnSelected7: [],
  filterBtnSelectedAll7: true,
 });
 const getData = async () => {
  setFilters({
   loading: false,
   ...filters,
  });
 };

 useEffect(() => {
  getData();
 }, []);
 React.useLayoutEffect(() => {
  navigation.setOptions({ title: "필터" });
 });

 return <FilterPresenter {...filters} />;
};
