import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/configure";
import ReactStore from "./ReactStore";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Image, StatusBar, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ThemeProvider } from "styled-components";
import * as Permissions from "expo-permissions";
import Stack from "./navigation/Stack";
import styles from "./styles";
import { AuthProvider } from "./AuthContext";
import { PermissionProvider } from "./PermissionContext";
import { TutorialProvider } from "./TutorialContext";
import { CodeProvider } from "./CodeContext";
import { UserRegistProvider } from "./UserRegistContext";
import { ModalProvider } from "./ModalContext";
import { codeApi } from "./api";

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
export default function App() {
 //  AsyncStorage.clear();
 const [codes, setCodes] = useState(null);
 const [userRegistInfo, setUserRegistInfo] = useState(null);
 const [isLoggedIn, setIsLoggedIn] = useState(null);
 const [hasTutorialPass, setHasTutorialPass] = useState(null);
 const [isReady, setIsReady] = useState(false);
 const [permissions, setPermissions] = useState(null);

 const loadAssets = async () => {
  const images = cacheImages([
   "https://images.unsplash.com/photo-1594782078968-2b07656d7bb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  ]);
  const fonts = cacheFonts([Ionicons.font, FontAwesome.font, FontAwesome5.font]);
  const codes = await cacheCodes();
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
 useEffect(() => {
  //_requestCameraPermission();
 });
 return isReady ? (
  <Provider store={store}>
   <ReactStore.Provider>
    <ThemeProvider theme={styles}>
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
          <StatusBar barStyle="light-content" />
         </TutorialProvider>
        </AuthProvider>
       </UserRegistProvider>
      </PermissionProvider>
     </CodeProvider>
     </ModalProvider>
    </ThemeProvider>
   </ReactStore.Provider>
  </Provider>
 ) : (
  <AppLoading
   startAsync={loadAssets}
   onFinish={onFinish}
   onError={console.error}
  />
 );
}
