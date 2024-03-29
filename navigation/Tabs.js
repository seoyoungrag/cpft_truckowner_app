import React, {useLayoutEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import {Text, Image} from "react-native";
import Orders from "../screens/Orders";
import Trans from "../screens/Trans";
import MyInfo from "../screens/MyInfo";
import {TouchableOpacity} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {useIsModal, useSetIsModalProp} from "../ModalContext";
import NoticeContainer from "../screens/Notice/NoticeContainer";

const Tabs = createBottomTabNavigator();
const getTabBarVisibility = (route) => {
	const routeNm = route?.state?.routes[route?.state?.index]?.name;
	/*console.log(route?.state?.routes[route?.state?.index]?.name);
 const childRoute = route?.state?.routes[route?.state?.index];
 console.log(childRoute?.state?.routes[childRoute?.state?.index]?.name);
 const childRouteNm = childRoute?.state?.routes[childRoute?.state?.index]?.name;*/

	if (routeNm === "추가정보입력" || routeNm === "UserStep4AddrFindView") {
		return false;
	}

	return true;
};

const Stack = createStackNavigator();
function HomeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Movies" component={MyInfo} />
		</Stack.Navigator>
	);
}
const getHeaderName = (route) => route?.state?.routeNames[route.state.index] || "";
//<FontAwesome5 name="truck-moving" size={24} color="black" />

export default ({navigation, route}) => {
	const setIsModalProp = useSetIsModalProp();
	useLayoutEffect(() => {
		/*
  setIsModalProp(false);
  navigation.setOptions({
   title: getHeaderName(route),
  });
  */
	}, [route]);
	return (
		<>
			<Tabs.Navigator
				screenOptions={({route}) => ({
					tabBarIcon: ({focused}) => {
						//let iconName = Platform.OS === "ios" ? "ios-" : "md-";
						let iconName = "";
						if (route.name === "Orders") {
							iconName += "truck";
						} else if (route.name === "Trans") {
							// iconName += "dolly";
							return focused ? <Image source={require("../assets/img/icon_calc.png")} /> : <Image source={require("../assets/img/icon_deCalc.png")} />;
						} else if (route.name === "NoticeContainer") {
							iconName += "film";
						} else if (route.name === "MyInfo") {
							iconName += "user-alt";
						} else if (route.name === "TV") {
							iconName += "tv";
						} else if (route.name === "Search") {
							iconName += "search";
						} else if (route.name === "Discovery") {
							iconName += "heart";
						} else if (route.name === "Photo") {
							iconName += "file-image";
						}
						return <FontAwesome5 name={iconName} color={focused ? "#3e50b4" : "#909090"} size={20} />;
					},
					tabBarLabel: ({focused}) => {
						let label;
						if (route.name === "Orders") {
							label = "오더";
						} else if (route.name === "Trans") {
							label = "정산";
						} else if (route.name === "MyInfo") {
							label = "My";
						} else if (route.name === "NoticeContainer") {
							label = "film";
						} else if (route.name === "TV") {
							label = "tv";
						} else if (route.name === "Search") {
							label = "search";
						} else if (route.name === "Discovery") {
							label = "heart";
						} else if (route.name === "Photo") {
							label = "albums";
						}
						return <Text style={{fontSize: 12, color: focused ? "#3e50b4" : "#909090"}}>{label}</Text>;
					},
				})}
				tabBarOptions={{
					showLabel: true,
					style: {
						/*backgroundColor: "#007bff",*/
						/*backgroundColor: "white",*/
						borderTopColor: useIsModal() ? "rgba(0,0,0,1)" : "silver",
						position: "absolute",
						/*opacity: useIsModal()? 0.5 : 1,*/
						backgroundColor: useIsModal() ? "rgba(0,0,0,1)" : "white",
					},
				}}
			>
				{/* <Tabs.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarButton: (props) => (useIsModal() ? <TouchableOpacity {...props} disabled={true} /> : <TouchableOpacity activeOpacity={1} {...props} />)
          }}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route)
          })}
        /> */}
				<Tabs.Screen
					name="Trans"
					component={Trans}
					options={{
						tabBarButton: (props) => (useIsModal() ? <TouchableOpacity {...props} disabled={true} /> : <TouchableOpacity activeOpacity={1} {...props} />),
					}}
					options={({route}) => ({
						tabBarVisible: getTabBarVisibility(route),
					})}
				/>
				<Tabs.Screen
					name="MyInfo"
					component={MyInfo}
					options={{
						tabBarButton: (props) => (useIsModal() ? <TouchableOpacity {...props} disabled={true} /> : <TouchableOpacity activeOpacity={1} {...props} />),
					}}
					options={({route}) => ({
						tabBarVisible: getTabBarVisibility(route),
					})}
				/>
				<Tabs.Screen
					name="NoticeContainer"
					component={NoticeContainer}
					options={{
						tabBarIcon: null,
						tabBarButton: (props) => null,
					}}
				/>
				{/* <Tabs.Screen name="NoticeContainer" component={NoticeContainer} /> */}
				{/**
    <Tabs.Screen
     name="Movies"
     component={Movies}
     options={{
      tabBarButton: (props) =>
       useIsModal() ? (
        <TouchableOpacity {...props} disabled={true} />
       ) : (
        <TouchableOpacity activeOpacity={1} {...props} />
       ),
     }}
    />
    <Tabs.Screen
     name="TV"
     component={Tv}
     options={{
      tabBarButton: (props) =>
       useIsModal() ? (
        <TouchableOpacity {...props} disabled={true} />
       ) : (
        <TouchableOpacity activeOpacity={1} {...props} />
       ),
     }}
    />
    <Tabs.Screen
     name="Search"
     component={Search}
     options={{
      tabBarButton: (props) =>
       useIsModal() ? (
        <TouchableOpacity {...props} disabled={true} />
       ) : (
        <TouchableOpacity activeOpacity={1} {...props} />
       ),
     }}
    />
    <Tabs.Screen
     name="Discovery"
     component={Favs}
     options={{
      tabBarButton: (props) =>
       useIsModal() ? (
        <TouchableOpacity {...props} disabled={true} />
       ) : (
        <TouchableOpacity activeOpacity={1} {...props} />
       ),
     }}
    />
    <Tabs.Screen
     name="Photo"
     component={PhotoNavigation}
     options={{
      tabBarButton: (props) =>
       useIsModal() ? (
        <TouchableOpacity {...props} disabled={true} />
       ) : (
        <TouchableOpacity activeOpacity={1} {...props} />
       ),
     }}
    /> */}
			</Tabs.Navigator>
		</>
	);
};
