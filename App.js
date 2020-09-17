import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Provider } from "react-redux";

import SplashScreen from "react-native-splash-screen";

import store from "./store/configure";
import ReactStore from "./ReactStore";

import * as Font from "expo-font";
import { Asset } from "expo-asset";
import {
 Image,
 AsyncStorage,
 Alert,
 AppState,
 View,
 Text,
 StatusBar,
 StyleSheet,
 Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ThemeProvider } from "styled-components";
import * as Permissions from "expo-permissions";
import Stack from "./navigation/Stack";
import theme from "./styles";
import { AuthProvider } from "./AuthContext";
import { PermissionProvider } from "./PermissionContext";
import { TutorialProvider } from "./TutorialContext";
import { CodeProvider } from "./CodeContext";
import { UserRegistProvider } from "./UserRegistContext";
import { ModalProvider } from "./ModalContext";
import { codeApi } from "./api";
import CodePush from "react-native-code-push";

const cacheImages = (images) =>
 images.map((image) => {
  if (typeof image == "string") {
   return Image.prefetch(image);
  } else {
   return Asset.fromModule(image).downloadAsync();
  }
 });

const cacheFonts = (fonts) =>
 fonts.map((font) => {
  Font.loadAsync(font);
 });

const cacheCodes = async () => {
 const [codes, codesErr] = await codeApi.codes();
 if (codesErr) {
  console.error(codesErr);
 }
 await AsyncStorage.setItem("codes", JSON.stringify(codes));
 return codes;
};

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME };
function App() {
 //AsyncStorage.clear();
 const [codes, setCodes] = useState(null);
 const [userRegistInfo, setUserRegistInfo] = useState(null);
 const [isLoggedIn, setIsLoggedIn] = useState(null);
 const [hasTutorialPass, setHasTutorialPass] = useState(null);
 const [isReady, setIsReady] = useState(false);
 const [permissions, setPermissions] = useState(null);

 const [restartAllowed, setRestartAllowed] = useState(true);
 const [syncMessage, setSyncMessage] = useState(null);
 const [progress, setProgress] = useState(null);
 const codePushStatusDidChange = (syncStatus) => {
  switch (syncStatus) {
   case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
    setSyncMessage("Checking for update.");
    break;
   case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
    setSyncMessage("Downloading package.");
    break;
   case CodePush.SyncStatus.AWAITING_USER_ACTION:
    setSyncMessage("Awaiting user action.");
    break;
   case CodePush.SyncStatus.INSTALLING_UPDATE:
    setSyncMessage("Installing update.");
    break;
   case CodePush.SyncStatus.UP_TO_DATE:
    setSyncMessage("App up to date.");
    break;
   case CodePush.SyncStatus.UPDATE_IGNORED:
    setSyncMessage("Update cancelled by user.");
    break;
   case CodePush.SyncStatus.UPDATE_INSTALLED:
    setSyncMessage("Update installed and will be applied on restart.");
    break;
   case CodePush.SyncStatus.UNKNOWN_ERROR:
    setSyncMessage("An unknown error occurred.");
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
     metadata ? JSON.stringify(metadata) : "Running binary version"
    );
    setProgress(false);
   },
   (error) => {
    setSyncMessage("Error: " + error);
    setProgress(false);
   }
  );
 };

 /** Update is downloaded silently, and applied on restart (recommended) */
 const sync = () => {
  CodePush.sync(
   {},
   codePushStatusDidChange.bind(this),
   codePushDownloadDidProgress.bind(this)
  );
 };

 /** Update pops a confirmation dialog, and then immediately reboots the app */
 const syncImmediate = () => {
  CodePush.sync(
   { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
   codePushStatusDidChange.bind(this),
   codePushDownloadDidProgress.bind(this)
  );
 };

 const loadAssets = async () => {
  console.log("loadAssets start");
  const images = cacheImages([
   "https://images.unsplash.com/photo-1594782078968-2b07656d7bb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  ]);
  const fonts = cacheFonts([
   Ionicons.font,
   FontAwesome.font,
   FontAwesome5.font,
  ]);
  const codes = await cacheCodes();
  console.log("loadAssets end");
  return Promise.all([...images, ...fonts, ...codes]);
 };

 const onFinish = async () => {
  const codes = await AsyncStorage.getItem("codes");
  try {
   setCodes(JSON.parse(codes));
  } catch (e) {
   console.log(e);
   setCodes(null);
  }
  const userRegistInfo = await AsyncStorage.getItem("userRegistInfo");
  try {
   setUserRegistInfo(JSON.parse(userRegistInfo));
  } catch (e) {
   console.log(e);
   setUserRegistInfo(null);
  }
  const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
  const hasTutorialPass = await AsyncStorage.getItem("hasTutorialPass");
  hasCameraPermission = await getCameraPermission();
  hasPhonePermission = await getPhonePermission();
  hasFilePermission = await getFilePermission();
  setPermissions({
   hasCameraPermission,
   hasPhonePermission,
   hasFilePermission,
  });
  if (!isLoggedIn || isLoggedIn === "false") {
   setIsLoggedIn(false);
  } else {
   setIsLoggedIn(true);
  }
  if (!hasTutorialPass || hasTutorialPass === "false") {
   setHasTutorialPass(false);
  } else {
   setHasTutorialPass(true);
  }
  //await checkForUpdates();
  setIsReady(true);
 };

 const getCameraPermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.CAMERA);
  return status;
 };

 const getPhonePermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.CONTACTS);
  return status;
 };
 const getFilePermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  return status;
 };
 /*
 useEffect(() => {
  AppState.addEventListener("change", checkForUpdates);
  return AppState.removeEventListener("change", checkForUpdates);
 });
*/
 const appLoading = async () => {
  //SplashScreen.show();
  await loadAssets();
  await onFinish();
  SplashScreen.hide();
 };
 useLayoutEffect(() => {
  appLoading();
 }, []);

 return (
  <>
   {isReady ? (
    progress ? (
     <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to CodePush!</Text>
      <TouchableOpacity onPress={this.sync.bind(this)}>
       <Text style={styles.syncButton}>Press for background sync</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
       <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
      </TouchableOpacity>
      {progressView}
      <Image
       style={styles.image}
       resizeMode={"contain"}
       source={require("./assets/laptop_phone_howitworks.png")}
      />
      <TouchableOpacity onPress={this.toggleAllowRestart.bind(this)}>
       <Text style={styles.restartToggleButton}>
        Restart {this.state.restartAllowed ? "allowed" : "forbidden"}
       </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.getUpdateMetadata.bind(this)}>
       <Text style={styles.syncButton}>Press for Update Metadata</Text>
      </TouchableOpacity>
      <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>
     </View>
    ) : (
     <Provider store={store}>
      <ReactStore.Provider>
       <ThemeProvider theme={theme}>
        <ModalProvider isModal={false}>
         <CodeProvider codes={codes}>
          <PermissionProvider
           hasCameraPermission={permissions?.hasCameraPermission}
           hasPhonePermission={permissions?.hasPhonePermission}
           hasFilePermission={permissions?.hasFilePermission}
          >
           <UserRegistProvider userRegistInfo={userRegistInfo}>
            <AuthProvider isLoggedIn={isLoggedIn}>
             <TutorialProvider hasTutorialPass={hasTutorialPass}>
              <NavigationContainer>
               <Stack />
              </NavigationContainer>
             </TutorialProvider>
            </AuthProvider>
           </UserRegistProvider>
          </PermissionProvider>
         </CodeProvider>
        </ModalProvider>
       </ThemeProvider>
      </ReactStore.Provider>
     </Provider>
    )
   ) : null}
   <StatusBar translucent />
  </>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  backgroundColor: "#F5FCFF",
  paddingTop: 50,
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

export default CodePush(App);
