import React, {useState, useEffect} from "react";

import {Image, Dimensions, Text, StyleSheet, Alert, Animated, Linking} from "react-native";

import CodePush from "react-native-code-push";
import * as Progress from "react-native-progress";
import {getStatusBarHeight} from "react-native-status-bar-height";

import VersionCheck from "react-native-version-check";
import DeviceInfo from "react-native-device-info";
import {startUpdateFlow,checkUpdateAvailability} from '@gurukumparan/react-native-android-inapp-updates';

import * as rq from "react-query";
import axios from "axios";
import {useToken} from "./AuthContext";
import messaging from "@react-native-firebase/messaging";

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

const updateModes = "immediate";
const {width} = Dimensions.get("screen");
const statusBarHeight = getStatusBarHeight();
let codePushOptions = {
	checkFrequency: CodePush.CheckFrequency.MANUAL,
	updateDialog: {
        title : "새로운 업데이트가 존재합니다.",
        optionalUpdateMessage : "지금 업데이트하시겠습니까?",
        optionalIgnoreButtonLabel : "나중에",
        optionalInstallButtonLabel : "업데이트"
	},
};
const UpdateApp = ({updateModalVisible}) => {
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
	/*
	const sync = () => {
		CodePush.sync({}, codePushStatusDidChange, codePushDownloadDidProgress);
	};
	*/
	/** Update pops a confirmation dialog, and then immediately reboots the app */
	const updateFromPlayStoreAndCodePush = async () => {
		const isEmulator = await DeviceInfo.isEmulator();

		console.log("UpdateApp", "isEmulator: ", isEmulator);
		
		checkUpdateAvailability().then(e=>{
			startUpdateFlow(updateModes);
			return {needPlayStoreUpdate: true};
		}).catch(e=>{
			console.log('react-native-android-inapp-updates errors', e);
			VersionCheck.needUpdate().then(async (res) => {
				console.log("UpdateApp", "needUpdate: ", res);
				if (res.isNeeded) {
					Alert.alert(
						'앱 업데이트 필요',
						'신규 기능에 대한 업데이트가 필요합니다.',
						[
						{ text: '확인', onPress: async () => Linking.openURL(await VersionCheck.getStoreUrl()+ '&rnd=' + Math.random()) }
						],
						{ cancelable: false }
					);
				}
			});
			return {needPlayStoreUpdate: false};
		}).then(({needPlayStoreUpdate})=>{
			console.log("needPlayStoreUpdate", needPlayStoreUpdate);
			if(needPlayStoreUpdate==false){
				CodePush.sync(codePushOptions,
					codePushStatusDidChange,
					codePushDownloadDidProgress
				);
			}
		});
		
	};
	const syncImmediate = async() => {
		await updateFromPlayStoreAndCodePush();
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
			delay: 1000,
		}).start();
		setTimeout(() => {
			setModalVisible(false);
			Animated.timing(animatedHeight, {
				toValue: -1,
				duration: 0,
				useNativeDriver: true,
			}).start();
		}, 1500);
	};
	const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(-1));

	const getFcmToken = React.useCallback(async () => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			// console.log(fcmToken);
			console.log("Your Firebase Token is:", fcmToken);
			setFcmToken(fcmToken);
		} else {
			console.log("Failed", "No token received");
		}
	}, []);

	const [fcmToken, setFcmToken] = React.useState(null);

	const url = "https://blueapi.teamfresh.co.kr/v2/account/transToken";
	// const url = "http://172.126.11.154:19201/v2/account/transToken";

	const token = useToken();

	const [tokenCall] = rq.useMutation(
		(obj) => {
			return axios.post(url, obj, {
				headers: {
					"Content-Type": "application/json",
					"X-AUTH-TOKEN": `${token}`,
				},
			});
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {},
		}
	);

	const asyncTokenCall = React.useCallback(async (obj) => {
		try {
			await tokenCall(obj);
		} catch {
			console.log("에러!!");
		}
	}, []);

	useEffect(() => {
		if (updateModalVisible === false) {
			setSyncMessage("");
		} else {
			const obj = {
				fcmToken: fcmToken,
			};
			if (token) {
				asyncTokenCall(obj);
			}
		}
		setModalVisible(updateModalVisible);
	}, [updateModalVisible, fcmToken, token]);

	React.useEffect(() => {
		getFcmToken();
	}, []);

	useEffect(() => {
		if (modalVisible) {
			Animated.timing(animatedHeight, {
				toValue: 0,
				duration: 100,
				useNativeDriver: true,
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
					? {height: statusBarHeight}
					: {
							height: 0,
					  },
				{
					transform: [
						{
							translateX: animatedHeight.interpolate({
								inputRange: [-1, 0, 1],
								outputRange: [-width, 0, width],
							}),
						},
					],
				},
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
			{progressUI != 0 && progressUI && <Progress.Bar progress={progressUI.receivedBytes /progressUI.totalBytes} indeterminate={indeterminate} />}
			{progressUI != 0 && progressUI && (
				<Text style={styles.messages}>
					{bytesToSize(progressUI.receivedBytes)} / {bytesToSize(progressUI.totalBytes)}
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
		justifyContent: "flex-start",
	},
	image: {
		marginLeft: statusBarHeight / 2,
		width: statusBarHeight,
		height: statusBarHeight,
		transform: [{rotateY: "180deg"}],
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
