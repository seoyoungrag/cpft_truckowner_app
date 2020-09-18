import React, { useState, useEffect } from "react";

import {
 Image,
 AppState,
 View,
 Text,
 StyleSheet,
 Dimensions,
 TouchableOpacity,
 Alert,
} from "react-native";

import Modal from "react-native-modal";

import CodePush from "react-native-code-push";

let codePushOptions = {
 updateDialog: {
  appendReleaseDescription: true,
  descriptionPrefix: "업데이트 설명",
  mandatoryContinueButtonLabel: "앱 업데이트",
  mandatoryUpdateMessage: "앱 업데이트를 수행해야 합니다.",
  title: "앱 코드푸시 테스트 중입니다. 1차",
 },
};
const UpdateApp = ({ updateModalVisible }) => {
 const [modalVisible, setModalVisible] = useState(false);
 const [restartAllowed, setRestartAllowed] = useState(true);
 const [syncMessage, setSyncMessage] = useState(null);
 const [progress, setProgress] = useState(null);
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
  setProgress(progress);
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
    setProgress(false);
   },
   (error) => {
    setSyncMessage("에러: " + error);
    setProgress(false);
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
   { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
   codePushStatusDidChange,
   codePushDownloadDidProgress
  );
  setTimeout(() => {
   setModalVisible(false);
  }, 500);
 };

 useEffect(() => {
  if (updateModalVisible === false) {
   setSyncMessage("");
  }
  setModalVisible(updateModalVisible);
 }, [updateModalVisible]);
 return (
  <Modal
   style={{ margin: 0 }}
   animationInTiming={1000}
   useNativeDriver={true}
   animationIn="pulse"
   coverScreen={true}
   isVisible={modalVisible}
   onModalShow={syncImmediate}
   onRequestClose={() => {
    Alert.alert("Modal has been closed.");
   }}
  >
   <View style={styles.container}>
    <Text style={styles.welcome}>앱 업데이트를 체크합니다.</Text>

    {/*
    <TouchableOpacity onPress={sync}>
     <Text style={styles.syncButton}>Press for background sync</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={syncImmediate}>
     <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
    </TouchableOpacity>

    */}
    {progress ? (
     <Text style={styles.messages}>
      {progress.receivedBytes} of {progress.totalBytes} bytes received
     </Text>
    ) : null}
    <Image
     style={styles.image}
     resizeMode={"contain"}
     source={require("./assets/laptop_phone_howitworks.png")}
    />
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
  </Modal>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  backgroundColor: "#F5FCFF",
  justifyContent: "center",
 },
 image: {
  margin: 30,
  width: Dimensions.get("window").width - 100,
  height: (365 * (Dimensions.get("window").width - 100)) / 651,
 },
 messages: {
  marginTop: 30,
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
  fontSize: 20,
  textAlign: "center",
  margin: 20,
 },
});

export default CodePush(codePushOptions)(UpdateApp);
