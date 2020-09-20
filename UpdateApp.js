import React, { useState, useEffect } from "react";

import { Image, View, Text, StyleSheet, Alert, Animated } from "react-native";

import CodePush from "react-native-code-push";
import * as Progress from "react-native-progress";
import { getStatusBarHeight } from "react-native-status-bar-height";

const statusBarHeight = getStatusBarHeight();
let codePushOptions = {
 checkFrequency: CodePush.CheckFrequency.MANUAL,
 updateDialog: {
  appendReleaseDescription: true,
  descriptionPrefix: "업데이트 설명",
  mandatoryContinueButtonLabel: "앱 업데이트",
  mandatoryUpdateMessage: "앱 업데이트 기능이 패치되었습니다.",
  title: "앱 업데이트가 발생했습니다.",
 },
};
const UpdateApp = ({ updateModalVisible }) => {
 const [modalVisible, setModalVisible] = useState(false);
 const [restartAllowed, setRestartAllowed] = useState(true);
 const [syncMessage, setSyncMessage] = useState(null);
 const [progressUI, setProgressUI] = useState(0);
 const [indeterminate, setIndeterminate] = useState(false);
 const codePushStatusDidChange = (syncStatus) => {
  switch (syncStatus) {
   case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
    setSyncMessage("업데이트를 체크 중입니다.");
    break;
   case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
    setSyncMessage("패키지를 다운로드 중입니다.");
    break;
   case CodePush.SyncStatus.AWAITING_USER_ACTION:
    setSyncMessage("사용자 액션을 기다립니다.");
    break;
   case CodePush.SyncStatus.INSTALLING_UPDATE:
    setSyncMessage("업데이트를 설치합니다.");
    break;
   case CodePush.SyncStatus.UP_TO_DATE:
    setSyncMessage("앱이 최신버전입니다.");
    setTimeout(() => {
     setModalVisible(false);
    }, 500);
    break;
   case CodePush.SyncStatus.UPDATE_IGNORED:
    setSyncMessage("사용자에 의해 업데이트가 취소되었습니다.");
    break;
   case CodePush.SyncStatus.UPDATE_INSTALLED:
    Alert.alert("업데이트가 적용되어 앱을 재시작합니다.");
    setSyncMessage("업데이트가 적용되어 앱을 재시작합니다.");
    break;
   case CodePush.SyncStatus.UNKNOWN_ERROR:
    setSyncMessage("네트워크 오류가 발생했습니다. \r\n 다시 시작해주세요.");
    break;
  }
 };

 const codePushDownloadDidProgress = (progress) => {
  setProgressUI(progress);
  //setIndeterminate(true);
 };

 const toggleAllowRestart = () => {
  restartAllowed ? CodePush.disallowRestart() : CodePush.allowRestart();

  setRestartAllowed(!restartAllowed);
 };

 const getUpdateMetadata = () => {
  CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
   (metadata) => {
    setSyncMessage(
     metadata ? JSON.stringify(metadata) : "실행 중 바이너리 버전"
    );
    setProgressUI(false);
   },
   (error) => {
    setSyncMessage("에러: " + error);
    setProgressUI(false);
   }
  );
 };

 /** Update is downloaded silently, and applied on restart (recommended) */
 const sync = () => {
  CodePush.sync({}, codePushStatusDidChange, codePushDownloadDidProgress);
 };

 /** Update pops a confirmation dialog, and then immediately reboots the app */
 const syncImmediate = () => {
  CodePush.sync(
   {
    installMode: CodePush.InstallMode.IMMEDIATE,
    updateDialog: {
     appendReleaseDescription: true,
     descriptionPrefix: "업데이트 설명",
     mandatoryContinueButtonLabel: "앱 업데이트",
     mandatoryUpdateMessage: "앱 업데이트 기능이 패치되었습니다.",
     title: "앱 업데이트가 발생했습니다.",
    },
   },
   codePushStatusDidChange,
   codePushDownloadDidProgress
  );
  /*
  setTimeout(() => {
   setModalVisible(false);
  }, 500);
  */
 };
 /*
 const [animatedHeight] = useState(new Animated.Value(0));

 const _fadein = () => {
  Animated.timing(animatedHeight, {
   toValue: 100,
   duration: 1000,
  }).start();
 };
 const _fadeout = () => {
  Animated.timing(modalVisible, {
   toValue: 1,
   duration: 1000,
  }).start();
 };
 */
 useEffect(() => {
  if (updateModalVisible === false) {
   setSyncMessage("");
  }
  setModalVisible(updateModalVisible);
 }, [updateModalVisible]);
 useEffect(() => {
  if (modalVisible) {
   /*
   Animated.timing(animatedHeight, {
    toValue: statusBarHeight,
    duration: 500,
    useNativeDriver: false,
   }).start();
 */
   syncImmediate();
  } else {
   /*
   Animated.timing(animatedHeight, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
    delay: 1000,
   }).start();
 */
  }
 }, [modalVisible]);
 return (
  <View
   style={[
    styles.container,
    modalVisible
     ? { height: statusBarHeight * 2 }
     : {
        height: 0,
       },
    {},
   ]}
  >
   {progressUI == 0 && (
    <Image
     style={styles.image}
     resizeMode={"contain"}
     source={require("./assets/laptop_phone_howitworks.png")}
    />
   )}
   <Text style={styles.welcome}>앱 업데이트 체크 중</Text>

   {/*
    <TouchableOpacity onPress={sync}>
     <Text style={styles.syncButton}>Press for background sync</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={syncImmediate}>
     <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
    </TouchableOpacity>

    */}
   {progressUI != 0 && progressUI && (
    <Progress.Bar
     progress={progressUI.receivedBytes / progressUI.totalBytes}
     indeterminate={true}
    />
   )}
   {progressUI != 0 && progressUI && (
    <Text style={styles.messages}>
     {progressUI.receivedBytes} / {progressUI.totalBytes}
    </Text>
   )}
   {/*
    <TouchableOpacity onPress={toggleAllowRestart}>
     <Text style={styles.restartToggleButton}>
      Restart {restartAllowed ? "allowed" : "forbidden"}
     </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={getUpdateMetadata}>
     <Text style={styles.syncButton}>Press for Update Metadata</Text>
    </TouchableOpacity>
    */}
   <Text style={styles.messages}>{syncMessage || ""}</Text>
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  alignItems: "flex-end",
  backgroundColor: "white",
  flexDirection: "row",
  justifyContent: "flex-start",
 },
 image: {
  width: 53,
  height: statusBarHeight - 2,
 },
 messages: {
  textAlign: "center",
 },
 restartToggleButton: {
  color: "blue",
  fontSize: 17,
 },
 syncButton: {
  color: "green",
  fontSize: 17,
 },
 welcome: {
  paddingHorizontal: 10,
  textAlign: "center",
 },
});

export default UpdateApp;
