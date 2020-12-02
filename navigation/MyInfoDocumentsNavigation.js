import React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import MyDtstmnList from "../screens/MyInfoDocuments/MyDtstmnList";
import MyTaxInvoiceList from "../screens/MyInfoDocuments/MyTaxInvoiceList";
import {Text, View, TouchableOpacity, Image} from "react-native";
import {FontAwesome5, Entypo} from "@expo/vector-icons";

const MyInfoEditTabs = createMaterialTopTabNavigator();
const MyInfoEditStacks = createStackNavigator();

const MyInfoEditTabsImpl = ({navigation, route}) => {
	return (
		<MyInfoEditTabs.Navigator
			screenOptions={({route}) => ({
				// tabBarIcon: ({focused}) => {
				// 	if (route.name === "MyDtstmnList") {
				// 		return focused ? <Image source={require("../assets/img/icon_dtstmn.png")} /> : <Image source={require("../assets/img/icon_calc.png")} />;
				// 	} else if (route.name === "MyTaxInvoiceList") {
				// 		return focused ? <Image source={require("../assets/img/icon_calc.png")} /> : <Image source={require("../assets/img/icon_deCalc.png")} />;
				// 	}
				// },
				tabBarLabel: ({focused}) => {
					let label;
					if (route.name === "MyDtstmnList") {
						label = "명세서";
					} else if (route.name === "MyTaxInvoiceList") {
						label = "세금계산서";
					}
					// let iconName = "";
					// if (route.name === "MyDtstmnList") {
					// 	iconName += "truck";
					// } else if (route.name === "MyTaxInvoiceList") {
					// 	iconName += "dolly";
					// }
					return (
						<View style={{flexDirection: "row"}}>
							{label === "명세서" ? (
								focused ? (
									<Image source={require("../assets/img/icon_dtstmn.png")} />
								) : (
									<Image source={require("../assets/img/icon_deDtstmn.png")} />
								)
							) : focused ? (
								<Image source={require("../assets/img/icon_calc.png")} />
							) : (
								<Image source={require("../assets/img/icon_deCalc.png")} />
							)}
							<Text style={{fontSize: 14, color: focused ? "#3e50b4" : "grey", marginLeft: 5, marginTop: 3}}>{label}</Text>
						</View>
					);
				},
			})}
			tabBarOptions={{
				showLabel: true,
				showIcon: true,
				style: {
					borderTopColor: "silver",
					color: "#3e50b4",
					backgroundColor: "white",
					justifyContent: "flex-start",
				},
			}}
			tabBarPosition="bottom"
		>
			<MyInfoEditTabs.Screen name="MyDtstmnList" component={MyDtstmnList} />
			<MyInfoEditTabs.Screen name="MyTaxInvoiceList" component={MyTaxInvoiceList} />
		</MyInfoEditTabs.Navigator>
	);
};

export default ({navigation, route}) => {
	return (
		<MyInfoEditStacks.Navigator
			mode="modal"
			screenOptions={{
				gestureEnabled: true,
				headerStyle: {
					backgroundColor: "#3e50b4",
					shadowColor: "#3e50b4",
					borderBottomColor: "#3e50b4",
				},
				headerTintColor: "white",
				headerBackTitleVisible: false,
				headerShown: false,
			}}
		>
			<MyInfoEditStacks.Screen
				name="MyInfoEditTabs"
				component={MyInfoEditTabsImpl}
				options={{
					headerTitleStyle: {
						textAlign: "center",
						marginLeft: -44,
						paddingLeft: 0,
						fontSize: 24,
						color: "white",
					},
					headerTintColor: "white",
					headerBackTitleVisible: false,
					headerShown: false,
					headerTitle: (props) => (
						<Text {...props}>
							<Entypo name="text-document" size={24} color="white" style={{}} />
						</Text>
					),
				}}
			/>
		</MyInfoEditStacks.Navigator>
	);
};
