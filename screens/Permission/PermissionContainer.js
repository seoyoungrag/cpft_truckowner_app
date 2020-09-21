import React, { useState, useEffect } from "react";
import PermissionPresenter from "./PermissionPresenter";
import {
 useRequestCameraPermission,
 useRequestFilePermission,
 useRequestPhonePermission,
} from "../../PermissionContext";

export default ({ navigation }) => {
 const requestCameraPermission = useRequestCameraPermission();
 const requestFilePermission = useRequestFilePermission();
 const requestPhonePermission = useRequestPhonePermission();
 const confrimBtnClicked = async () => {
  await requestCameraPermission();
  await requestFilePermission();
  await requestPhonePermission();
 };
 React.useLayoutEffect(() => {
  navigation.setOptions({ title: "권한 설정" });
 });

 return <PermissionPresenter confrimBtnClicked={confrimBtnClicked} />;
};
