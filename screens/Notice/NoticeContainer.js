import React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import MyDtstmnList from "../MyInfoDocuments/MyDtstmnList";
import MyTaxInvoiceList from "../MyInfoDocuments/MyTaxInvoiceList";
import {Text, View, TouchableOpacity, Image} from "react-native";
import {FontAwesome5, Entypo} from "@expo/vector-icons";
import NoticeList from "./NoticeList";
import PushList from "./PushList";

const NoticeContainer = createMaterialTopTabNavigator();
const NoticeContainerStacks = createStackNavigator();

const NoticeContainerImpl = ({navigation, route}) => {
	return (
		<NoticeContainer.Navigator
			screenOptions={({route}) => ({
				tabBarLabel: ({focused}) => {
					let label;
					if (route.name === "PushList") {
						label = "알림";
					} else if (route.name === "NoticeList") {
						label = "공지사항";
					}
					// let iconName = "";
					// if (route.name === "MyDtstmnList") {
					// 	iconName += "truck";
					// } else if (route.name === "MyTaxInvoiceList") {
					// 	iconName += "dolly";
					// }
					return (
						<Text style={{fontSize: 16, color: focused ? "#3e50b4" : "grey", fontWeight: "bold"}}>
							{/* <FontAwesome5 name={iconName} color={focused ? "#3e50b4" : "grey"} size={20} />
							{"  "} */}
							{label}
						</Text>
					);
				},
			})}
			tabBarOptions={{
				showLabel: true,
				style: {
					borderTopColor: "silver",
					color: "#3e50b4",
					backgroundColor: "white",
				},
			}}
		>
			<NoticeContainer.Screen name="PushList" component={PushList} />
			<NoticeContainer.Screen name="NoticeList" component={NoticeList} />
		</NoticeContainer.Navigator>
	);
};

export default ({navigation, route}) => {
	return (
		<NoticeContainerStacks.Navigator
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
		>
			<NoticeContainerStacks.Screen
				name="MyInfoEditTabs"
				component={NoticeContainerImpl}
				// options={{
				// 	headerTitleStyle: {
				// 		textAlign: "center",
				// 		marginLeft: -44,
				// 		paddingLeft: 0,
				// 		fontSize: 24,
				// 		color: "white",
				// 	},
				// 	headerTintColor: "white",
				// 	headerBackTitleVisible: false,
				// 	headerShown: false,
				// 	headerTitle: (props) => (
				// 		<Text {...props}>
				// 			<Entypo name="text-document" size={24} color="white" style={{}} />
				// 		</Text>
				// 	),
				// }}
			/>
		</NoticeContainerStacks.Navigator>
	);
};
