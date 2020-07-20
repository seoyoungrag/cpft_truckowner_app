import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/configure";
import ReactStore from "./ReactStore";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Image, StatusBar, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { ThemeProvider } from "styled-components";
import Stack from "./navigation/Stack";
import styles from "./styles";
import { AuthProvider } from "./AuthContext";

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
export default function App() {
 const [isReady, setIsReady] = useState(false);
 const [hasCameraPermission, setHasCameraPermission] = useState(null);

 const loadAssets = () => {
  const images = cacheImages([
   "https://images.unsplash.com/photo-1594782078968-2b07656d7bb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  ]);
  const fonts = cacheFonts([Ionicons.font, FontAwesome.font]);
  return Promise.all([...images, ...fonts]);
 };

 const onFinish = async () => {
  setIsReady(true);
 };

 const _requestCameraPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  console.log(status);
  const { status1 } = await Permissions.askAsync(Permissions.LOCATION);
  console.log(status1);
  setHasCameraPermission("granted");
 };

 useEffect(() => {
  _requestCameraPermission();
 });
 return isReady ? (
  <Provider store={store}>
   <ReactStore.Provider>
    <ThemeProvider theme={styles}>
     <AuthProvider>
      <NavigationContainer>
       <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
     </AuthProvider>
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
