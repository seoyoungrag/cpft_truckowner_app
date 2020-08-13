import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { Text } from "react-native";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

const MyInfoEditTabs = createMaterialTopTabNavigator();
const MyInfoEditStacks = createStackNavigator();

const MyInfoEditTabsImpl = ({ navigation, route }) => {
 //console.log(navigation, route.params);
 return (
  <MyInfoEditTabs.Navigator
   screenOptions={({ route }) => ({
    tabBarLabel: ({ focused }) => {
     let label;
     if (route.name === "SelectPhoto") {
      label = "명세서";
     } else if (route.name === "TakePhoto") {
      label = "세금계산서";
     }
     let iconName = "";
     if (route.name === "SelectPhoto") {
      iconName += "truck";
     } else if (route.name === "TakePhoto") {
      iconName += "dolly";
     }
     return (
      <Text style={{ fontSize: 12, color: focused ? "#3a99fc" : "grey" }}>
       <FontAwesome5
        name={iconName}
        color={focused ? "#3a99fc" : "grey"}
        size={20}
       />
       {"  "}
       {label}
      </Text>
     );
    },
   })}
   tabBarOptions={{
    showLabel: true,
    style: {
     borderTopColor: "silver",
     color: "#3a99fc",
     backgroundColor: "white",
    },
   }}
   tabBarPosition="bottom"
  >
   <MyInfoEditTabs.Screen name="SelectPhoto" component={SelectPhoto} />
   <MyInfoEditTabs.Screen name="TakePhoto" component={TakePhoto} />
  </MyInfoEditTabs.Navigator>
 );
};

export default ({ navigation, route }) => {
 console.log(route.params);
 return (
  <MyInfoEditStacks.Navigator
   mode="modal"
   screenOptions={{
    gestureEnabled: true,
    headerStyle: {
     backgroundColor: "#3a99fc",
     shadowColor: "#3a99fc",
     borderBottomColor: "#3a99fc",
    },
    headerTintColor: "white",
    headerBackTitleVisible: false,
    headerShown: true,
   }}
  >
   <MyInfoEditStacks.Screen
    name="photoTabs"
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
     headerShown: true,
     headerTitle: (props) => (
      <Text {...props}>
       <Entypo name="text-document" size={24} color="white" style={{}} />
      </Text>
     ),
    }}
   />
   <MyInfoEditStacks.Screen name="UploadPhoto" component={UploadPhoto} />
  </MyInfoEditStacks.Navigator>
 );
};
