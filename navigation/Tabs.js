import React, { useState, useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import Orders from "../screens/Orders";
import Trans from "../screens/Trans";
import MyInfo from "../screens/MyInfo";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity, TouchableHighlight } from "react-native";
import PhotoNavigation from "./PhotoNavigation";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native-animatable";
import { useIsModal, useSetIsModalProp } from "../ModalContext";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

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

const getHeaderName = (route) =>
 route?.state?.routeNames[route.state.index] || "";
//<FontAwesome5 name="truck-moving" size={24} color="black" />

export default ({ navigation, route }) => {
 const setIsModalProp = useSetIsModalProp();
 useLayoutEffect(() => {
  /*
  setIsModalProp(false);
  navigation.setOptions({
   title: getHeaderName(route),
  });
  */
 }, [route]);
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
    }
   } catch (e) {
    console.log(e);
    // handle or log error
   }
  } else {
   return;
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
     },
    },
   ],
   {
    cancelable: false,
   }
  );
 };
 useEffect(() => {
  //checkForUpdates();
 }, [route]);
 return (
  <>
   <Tabs.Navigator
    screenOptions={({ route }) => ({
     tabBarIcon: ({ focused }) => {
      //let iconName = Platform.OS === "ios" ? "ios-" : "md-";
      let iconName = "";
      if (route.name === "Orders") {
       iconName += "truck";
      } else if (route.name === "Trans") {
       iconName += "dolly";
      } else if (route.name === "Movies") {
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
      return (
       <FontAwesome5
        name={iconName}
        color={focused ? "#3E50B4" : "#909090"}
        size={20}
       />
      );
     },
     tabBarLabel: ({ focused }) => {
      let label;
      if (route.name === "Orders") {
       label = "오더";
      } else if (route.name === "Trans") {
       label = "운송";
      } else if (route.name === "MyInfo") {
       label = "My";
      } else if (route.name === "Movies") {
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
      return (
       <Text style={{ fontSize: 12, color: focused ? "#3E50B4" : "#909090" }}>
        {label}
       </Text>
      );
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
    <Tabs.Screen
     name="Orders"
     component={Orders}
     options={{
      tabBarButton: (props) =>
       useIsModal() ? (
        <TouchableOpacity {...props} disabled={true} />
       ) : (
        <TouchableOpacity activeOpacity={1} {...props} />
       ),
     }}
     options={({ route }) => ({
      tabBarVisible: getTabBarVisibility(route),
     })}
    />
    <Tabs.Screen
     name="Trans"
     component={Trans}
     options={{
      tabBarButton: (props) =>
       useIsModal() ? (
        <TouchableOpacity {...props} disabled={true} />
       ) : (
        <TouchableOpacity activeOpacity={1} {...props} />
       ),
     }}
     options={({ route }) => ({
      tabBarVisible: getTabBarVisibility(route),
     })}
    />
    <Tabs.Screen
     name="MyInfo"
     component={MyInfo}
     options={{
      tabBarButton: (props) =>
       useIsModal() ? (
        <TouchableOpacity {...props} disabled={true} />
       ) : (
        <TouchableOpacity activeOpacity={1} {...props} />
       ),
     }}
     options={({ route }) => ({
      tabBarVisible: getTabBarVisibility(route),
     })}
    />
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
