import React, { useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import Orders from "../screens/Orders";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import PhotoNavigation from "./PhotoNavigation";
import { FontAwesome5 } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) =>
 route?.state?.routeNames[route.state.index] || "";
//<FontAwesome5 name="truck-moving" size={24} color="black" />

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
     //let iconName = Platform.OS === "ios" ? "ios-" : "md-";
     let iconName = "";
     if (route.name === "Orders") {
      iconName += "truck";
     } else if (route.name === "Movies") {
      iconName += "film";
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
       color={focused ? "#3a99fc" : "grey"}
       size={20}
      />
     );
    },
    tabBarLabel: ({ focused }) => {
     let label;
     if (route.name === "Orders") {
      label = "오더";
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
     return <Text style={{ fontSize: 12 }}>{label}</Text>;
    },
   })}
   tabBarOptions={{
    showLabel: true,
    style: {
     /*backgroundColor: "#007bff",*/
     /*backgroundColor: "white",*/
     borderTopColor: "silver",
    },
   }}
  >
   <Tabs.Screen name="Orders" component={Orders} />
   <Tabs.Screen name="Movies" component={Movies} />
   <Tabs.Screen name="TV" component={Tv} />
   <Tabs.Screen name="Search" component={Search} />
   <Tabs.Screen name="Discovery" component={Favs} />
   <Tabs.Screen name="Photo" component={PhotoNavigation} />
  </Tabs.Navigator>
 );
};
