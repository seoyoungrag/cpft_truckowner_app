import React, { useState, useEffect } from "react";

import { Image, Dimensions, Text, StyleSheet, Alert, Animated } from "react-native";

import CodePush from "react-native-code-push";
import * as Progress from "react-native-progress";
import { getStatusBarHeight } from "react-native-status-bar-height";

import VersionCheck from "react-native-version-check";
import DeviceInfo from "react-native-device-info";
import { startUpdateFlow } from "react-native-android-inapp-updates";

const updateModes = "immediate";
const { width } = Dimensions.get("screen");
const statusBarHeight = getStatusBarHeight();
let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  updateDialog: {
    appendReleaseDescription: true,
    descriptionPrefix: "업데이트 설명",
    mandatoryContinueButtonLabel: "앱 업데이트",
    mandatoryUpdateMessage: "앱 업데이트 기능이 패치되었습니다.",
    title: "앱 업데이트가 발생했습니다."
  }
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
        setIndeterminate(false);
        setSyncMessage("업데이트를 설치합니다.");
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setSyncMessage("앱이 최신버전입니다.");
        fadeOutAnimation();
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
        setSyncMessage(metadata ? JSON.stringify(metadata) : "실행 중 바이너리 버전");
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
  const updateFromPlayStore = async () => {
    const isEmulator = await DeviceInfo.isEmulator();

    console.log("UpdateApp", "isEmulator: ", isEmulator);
    //공개 버전이 되어야 쓸 수 있음.
    /*
    VersionCheck.getLatestVersion({
      forceUpdate: true,
      provider: () =>
        fetch("https://play.google.com/store/apps/details?id=kr.co.teamfresh.cpft.truckowner.android")
          .then(
            (r) =>{
                if (r.status && r.status == 404) {
                  console.log("UpdateApp", "getLatestVersion: ",r);
                  return Promise.reject("플레이스토어에서 앱을 찾을 수 없음.");
                }else{
                  console.log("UpdateApp", "getLatestVersion: ",r);
                }
                return r.json();
              })
          .then(({ version }) => version)
    })
    */
   console.log(VersionCheck.getCurrentBuildNumber());

   VersionCheck.needUpdate()
  .then(res => {
    console.log(res);
    // { isNeeded: true, currentVersion: "1.0.0", latestVersion: "1.1.0" }
  });
   VersionCheck.getLatestVersion()
  .then(latestVersion => {
    console.log("UpdateApp", "getLatestVersion: ",latestVersion);
    // 2.0.0
  })
      
          VersionCheck.needUpdate().then(async (res) => {
            console.log("UpdateApp", "needUpdate: ",res);
            if (res.isNeeded) {
              try {
                const result = await startUpdateFlow(updateModes);
                console.log(result);
              } catch (e) {
                console.log("UpdateApp", "updateFromPlayStore error:", e);
              }
            }
          });

    if (!isEmulator) {
      //공개 버전이 되어야 쓸 수 있음.

      try {
        const result = await startUpdateFlow(updateModes);
        console.log("UpdateApp", "startUpdateFlow result: ", result);
      } catch (e) {
        console.log("UpdateApp", "startUpdateFlow error: ", e);
      }
    }
  };
  const syncImmediate = () => {
    updateFromPlayStore();
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: {
          appendReleaseDescription: true,
          descriptionPrefix: "업데이트 설명",
          mandatoryContinueButtonLabel: "앱 업데이트",
          mandatoryUpdateMessage: "앱 업데이트 기능이 패치되었습니다.",
          title: "앱 업데이트가 발생했습니다."
        }
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

  const fadeOutAnimation = () => {
    Animated.timing(animatedHeight, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      delay: 1000
    }).start();
    setTimeout(() => {
      setModalVisible(false);
      Animated.timing(animatedHeight, {
        toValue: -1,
        duration: 0,
        useNativeDriver: true
      }).start();
    }, 1500);
  };
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(-1));

  useEffect(() => {
    if (updateModalVisible === false) {
      setSyncMessage("");
    }
    setModalVisible(updateModalVisible);
  }, [updateModalVisible]);
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start();

      syncImmediate();
    } else {
      /*
   Animated.timing(animatedHeight, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
    delay: 1000,
   }).start();
   */
    }
  }, [modalVisible]);
  return (
    <Animated.View
      style={[
        styles.container,
        modalVisible
          ? { height: statusBarHeight }
          : {
              height: 0
            },
        {
          transform: [
            {
              translateX: animatedHeight.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [-width, 0, width]
              })
            }
          ]
        }
      ]}
    >
      <Image style={styles.image} resizeMode={"contain"} source={require("./assets/launcher.png")} />
      {progressUI == 0 && <Text style={styles.welcome}>앱 업데이트 체크 중</Text>}
      {/*
    <TouchableOpacity onPress={sync}>
     <Text style={styles.syncButton}>Press for background sync</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={syncImmediate}>
     <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
    </TouchableOpacity>

    */}
      {progressUI != 0 && progressUI && (
        <Progress.Bar progress={progressUI.receivedBytes / progressUI.totalBytes} indeterminate={indeterminate} />
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  image: {
    marginLeft: statusBarHeight / 2,
    width: statusBarHeight,
    height: statusBarHeight,
    transform: [{ rotateY: "180deg" }]
  },
  messages: {
    textAlign: "center"
  },
  restartToggleButton: {
    color: "blue",
    fontSize: 17
  },
  syncButton: {
    color: "green",
    fontSize: 17
  },
  welcome: {
    paddingHorizontal: 10,
    textAlign: "center"
  }
});

export default UpdateApp;
