import React, {useState, useEffect} from "react";
import {TouchableOpacity, View, Text, Image} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {MaterialIcons, FontAwesome5, Entypo} from "@expo/vector-icons";
import TransContainer from "./TransContainer";
import {useLogOut} from "../../AuthContext";
import {useGetUserRegistInfo} from "../../UserRegistContext";
import {useNavigation} from "@react-navigation/native";
import JiraIssueCollectModal from "../../components/JiraIssueCollectModal";

import {getStatusBarHeight} from "react-native-status-bar-height";

const statusBarHeight = getStatusBarHeight();

const Stack = createStackNavigator();

export default () => {
	const logOut = useLogOut();
	const navigation = useNavigation();
	const getUserRegistInfo = useGetUserRegistInfo();
	const [userRegistInfo, setUserRegistInfoProp] = useState(null);
	const fetchData = async () => {
		const data = await getUserRegistInfo();
		setUserRegistInfoProp(data);
	};
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", async () => {
			if (!userRegistInfo) {
				await fetchData();
			} else {
			}
		});
		return unsubscribe;
	}, [navigation]);

	return (
		<Stack.Navigator
			mode="modal"
			screenOptions={{
				headerStyle: {
					borderBottomColor: "#3e50b4",
					borderBottomWidth: 3,
				},
				headerStatusBarHeight: 0,
				headerLeftContainerStyle: {
					marginLeft: 15,
				},
				headerTitleContainerStyle: {
					alignItems: "center",
				},
				headerRightContainerStyle: {
					marginRight: 15,
				},
				headerLeft: () => (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("EditConfig");
						}}
					>
						<Image source={require("../../assets/img/icon_setting.png")} />
					</TouchableOpacity>
				),
				headerTitle: () => <Image source={require("../../assets/img/logo_timf_plus.png")} />,
				headerRight: () => (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("NoticeContainer");
						}}
					>
						<Image source={require("../../assets/img/icon_deNotification.png")} />
					</TouchableOpacity>
				),
			}}
			// screenOptions={{
			// 	gestureEnabled: true,
			// 	headerStyle: {
			// 		backgroundColor: "white",
			// 		shadowColor: "black",
			// 		// borderBottomColor: "silver",
			// 		height: statusBarHeight,
			// 		// height: 60,
			// 		borderBottomColor: "#3e50b4",
			// 		borderBottomWidth: 3,
			// 	},
			// 	headerTintColor: "#3e50b4",
			// 	headerBackTitleVisible: false,
			// }}
		>
			<Stack.Screen name="용차블루" component={TransContainer} />
		</Stack.Navigator>
	);
};
