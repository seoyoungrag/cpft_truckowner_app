import React, { useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import PhotoNavigation from "./PhotoNavigation";

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) =>
 route?.state?.routeNames[route.state.index] || "Movies";

export default ({ navigation, route }) => {
 //console.log(route);
 useLayoutEffect(() => {
  navigation.setOptions({
   title: getHeaderName(route),
  });
 }, [route]);

 return (
  <Tabs.Navigator
   screenOptions={({ route }) => ({
    tabBarIcon: ({ focused }) => {
     let iconName = Platform.OS === "ios" ? "ios-" : "md-";
     if (route.name === "Movies") {
      iconName += "film";
     } else if (route.name === "TV") {
      iconName += "tv";
     } else if (route.name === "Search") {
      iconName += "search";
     } else if (route.name === "Discovery") {
      iconName += "heart";
     }
     return (
      <Ionicons name={iconName} color={focused ? "white" : "grey"} size={26} />
     );
    },
   })}
   tabBarOptions={{
    showLabel: false,
    style: {
     backgroundColor: "black",
     borderTopColor: "black",
    },
   }}
  >
   <Tabs.Screen name="Movies" component={Movies} />
   <Tabs.Screen name="TV" component={Tv} />
   <Tabs.Screen name="Search" component={Search} />
   <Tabs.Screen name="Discovery" component={Favs} />
   <Tabs.Screen name="Photo" component={PhotoNavigation} />
  </Tabs.Navigator>
 );
};
