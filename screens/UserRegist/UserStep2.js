import React, { useState, useEffect } from "react";
import {
 useRequestCameraPermission,
 useRequestFilePermission,
 useRequestPhonePermission,
} from "../../PermissionContext";
import { View } from "react-native";

export default ({ navigation }) => {
 const requestCameraPermission = useRequestCameraPermission();
 const requestFilePermission = useRequestFilePermission();
 const requestPhonePermission = useRequestPhonePermission();
 const confrimBtnClicked = async () => {
  await requestCameraPermission();
  await requestFilePermission();
  await requestPhonePermission();
 };
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

 return <View confrimBtnClicked={confrimBtnClicked} />;
};
