import React, {useRef, useState, useEffect, useLayoutEffect} from "react";
import {Provider} from "react-redux";

import SplashScreen from "react-native-splash-screen";

import store from "./store/configure";
import ReactStore from "./ReactStore";

import * as Font from "expo-font";
import {Asset} from "expo-asset";
import {Image, AppState, Alert, SafeAreaView, LogBox} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {ThemeProvider} from "styled-components";
import * as Permissions from "expo-permissions";
import Stack from "./navigation/Stack";
import theme from "./styles";
import {AuthProvider} from "./AuthContext";
import {PermissionProvider} from "./PermissionContext";
import {TutorialProvider} from "./TutorialContext";
import {CodeProvider} from "./CodeContext";
import {UserRegistProvider} from "./UserRegistContext";
import {ModalProvider} from "./ModalContext";
import {codeApi} from "./api";

import UpdateApp from "./UpdateApp";

import messaging from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";

import BackendHealthCheck from "./BackendHealthCheck";
const updateModes = "immediate";

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
		console.log(codesErr);
	}
	await AsyncStorage.setItem("codes", JSON.stringify(codes));
	return codes;
};

function App() {
	const requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			getFcmToken();
			console.log("Authorization status:", authStatus);
		}
	};
	const getFcmToken = async () => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			console.log(fcmToken);
			console.log("Your Firebase Token is:", fcmToken);
		} else {
			console.log("Failed", "No token received");
		}
	};
	const [updateModalVisible, setUpdateModalVisible] = useState(false);
	const appState = useRef(AppState.currentState);
	useEffect(() => {
		requestUserPermission();
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		AppState.addEventListener("change", _handleAppStateChange);

		return () => {
			AppState.removeEventListener("change", _handleAppStateChange);
		};
	}, []);

	useEffect(() => {
		setUpdateModalVisible(true);
	}, []);
	const _handleAppStateChange = async (nextAppState) => {
		if (appState.current.match(/inactive|background/) && nextAppState === "active") {
			console.log("CUSTOMTAG", "App has come to the foreground! from ", appState.current);
			setUpdateModalVisible(true);
		}

		if (nextAppState === "active") {
			/*
   try {
    const result = await startUpdateFlow(updateModes);
   } catch (e) {
    console.log("error:", e);
   }
   setUpdateModalVisible(true);
   */
			console.log("CUSTOMTAG", "App has come to the active!");
		}

		if (nextAppState === "background") {
			setUpdateModalVisible(false);
			console.log("CUSTOMTAG", "App has come to the background!");
		}
		if (nextAppState === "inactive") {
			setUpdateModalVisible(false);
			console.log("CUSTOMTAG", "App has come to the inactive!");
		}

		appState.current = nextAppState;
		console.log("AppState", appState.current);
	};
	//AsyncStorage.clear();
	const [codes, setCodes] = useState(null);
	const [userRegistInfo, setUserRegistInfo] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [hasTutorialPass, setHasTutorialPass] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const [permissions, setPermissions] = useState(null);

	const loadAssets = async () => {
		console.log("loadAssets start");
		/*
  const images = cacheImages([
   "https://images.unsplash.com/photo-1594782078968-2b07656d7bb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  ]);
  */
		const fonts = cacheFonts([Ionicons.font, FontAwesome.font, FontAwesome5.font]);
		const codes = await cacheCodes();
		console.log("loadAssets end");
		//return Promise.all([...images, ...fonts, ...codes]);
		return Promise.all([...fonts, ...codes]);
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
		try {
			const hasTutorialPass = await AsyncStorage.getItem("hasTutorialPass");
			if (!hasTutorialPass || hasTutorialPass === "false") {
				setHasTutorialPass(false);
			} else {
				setHasTutorialPass(true);
			}
		} catch (e) {
			console.log(e);
			setHasTutorialPass(true);
		}
		try {
			const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
			if (!isLoggedIn || isLoggedIn === "false") {
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
		} catch (e) {
			console.log(e);
			setIsLoggedIn(true);
		}
		const hasCameraPermission = await getCameraPermission();
		const hasPhonePermission = await getPhonePermission();
		const hasFilePermission = await getFilePermission();
		setPermissions({
			hasCameraPermission,
			hasPhonePermission,
			hasFilePermission,
		});
		//await checkForUpdates();
	};

	const getCameraPermission = async () => {
		const {status} = await Permissions.getAsync(Permissions.CAMERA);
		return status;
	};

	const getPhonePermission = async () => {
		const {status} = await Permissions.getAsync(Permissions.CONTACTS);
		return status;
	};
	const getFilePermission = async () => {
		const {status} = await Permissions.getAsync(Permissions.CAMERA_ROLL);
		return status;
	};
	/*
 useEffect(() => {
  AppState.addEventListener("focus", checkForUpdates);
  return AppState.removeEventListener("focus", checkForUpdates);
 });
*/
	const appLoading = async () => {
		//SplashScreen.show();
		try {
			await loadAssets();
			await onFinish();
		} catch (e) {
			console.log(e);
		}
		setIsReady(true);
		SplashScreen.hide();
	};
	useLayoutEffect(() => {
		appLoading();
	}, []);

	return (
		<SafeAreaView flex={1}>
			{/*<BackendHealthCheck updateModalVisible={updateModalVisible}></BackendHealthCheck>*/}
			<UpdateApp updateModalVisible={updateModalVisible}></UpdateApp>
			{isReady ? (
				<>
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
														<Stack />
													</TutorialProvider>
												</AuthProvider>
											</UserRegistProvider>
										</PermissionProvider>
									</CodeProvider>
								</ModalProvider>
							</ThemeProvider>
						</ReactStore.Provider>
					</Provider>
				</>
			) : null}
		</SafeAreaView>
	);
}

export default App;
