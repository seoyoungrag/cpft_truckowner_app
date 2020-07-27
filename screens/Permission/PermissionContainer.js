import React, { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import PermissionPresenter from "./PermissionPresenter";
import { movieApi, tvApi } from "../../api";

export default ({ navigation }) => {
 const [detail, setDetail] = useState({
  loading: true,
 });
 const getData = async () => {
  setDetail({ loading: false });
 };

 useEffect(() => {
  getData();
 }, []);
 React.useLayoutEffect(() => {
  navigation.setOptions({ title: "권한 설정" });
 });

 return <PermissionPresenter />;
};
