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
} from "react-native";
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
 //AsyncStorage.clear();
 const [codes, setCodes] = useState(null);
 const [userRegistInfo, setUserRegistInfo] = useState(null);
 const [isLoggedIn, setIsLoggedIn] = useState(null);
 const [hasTutorialPass, setHasTutorialPass] = useState(null);
 const [isReady, setIsReady] = useState(false);
 const [permissions, setPermissions] = useState(null);

 const checkForUpdates = async () => {
  if (!__DEV__) {
   try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
     Alert.alert(
      "알림!",
      "새로운 버전이 있습니다. 업데이트 하시겠습니까?",
      [
       {
        text: "아니오",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
       },
       { text: "네", onPress: () => runUpdate() },
      ],
      { cancelable: false }
     );
    } else {
     setIsReady(true);
    }
   } catch (e) {
    console.log(e);
    // handle or log error
   }
  } else {
   setIsReady(true);
   return;
   Alert.alert(
    "알림!_개발모드1",
    "새로운 버전이 있습니다. 업데이트 하시겠습니까?",
    [
     {
      text: "네",
      onPress: async () => {
       console.log(1);
       try {
        const update = await Updates.fetchUpdateAsync();
        Alert.alert(
         "com",
         JSON.stringify(update),
         [
          {
           text: "네",
           onPress: async () => {
            console.log(update);
            Updates.reloadAsync();
            console.log(2);
            setIsReady(true);
           },
          },
         ],
         {
          cancelable: false,
         }
        );
       } catch (e) {
        console.log(e);
        setIsReady(true);
       }
      },
     },
    ],
    {
     cancelable: false,
    }
   );
  }
 };

 const runUpdate = async () => {
  await Updates.fetchUpdateAsync(); //최신업데이트 동기화, 로컬 캐시에 저장
  // ... notify user of update ...

  Alert.alert(
   "업데이트 완료!",
   "업데이트가 완료되었습니다.",
   [
    {
     text: "네",
     onPress: async () => {
      await Updates.reloadAsync();
      console.log("update complete");
      setIsReady(true);
     },
    },
   ],
   {
    cancelable: false,
   }
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
            </TutorialProvider>
           </AuthProvider>
          </UserRegistProvider>
         </PermissionProvider>
        </CodeProvider>
       </ModalProvider>
      </ThemeProvider>
     </ReactStore.Provider>
    </Provider>
   ) : null}
   <StatusBar translucent />
  </>
 );
}
