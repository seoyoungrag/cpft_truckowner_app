import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MyDtstmnList from "../screens/MyInfoDocuments/MyDtstmnList";
import MyTaxInvoiceList from "../screens/MyInfoDocuments/MyTaxInvoiceList";
import { Text } from "react-native";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

const MyInfoEditTabs = createMaterialTopTabNavigator();
const MyInfoEditStacks = createStackNavigator();

const MyInfoEditTabsImpl = ({ navigation, route }) => {
 //console.log(navigation, route.params);
 return (
  <MyInfoEditTabs.Navigator
   screenOptions={({ route }) => ({
    tabBarLabel: ({ focused }) => {
     let label;
     if (route.name === "MyDtstmnList") {
      label = "명세서";
     } else if (route.name === "MyTaxInvoiceList") {
      label = "세금계산서";
     }
     let iconName = "";
     if (route.name === "MyDtstmnList") {
      iconName += "truck";
     } else if (route.name === "MyTaxInvoiceList") {
      iconName += "dolly";
     }
     return (
      <Text style={{ fontSize: 12, color: focused ? "#3e50b4" : "grey" }}>
       <FontAwesome5
        name={iconName}
        color={focused ? "#3e50b4" : "grey"}
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
     color: "#3e50b4",
     backgroundColor: "white",
    },
   }}
   tabBarPosition="bottom"
  >
   <MyInfoEditTabs.Screen name="MyDtstmnList" component={MyDtstmnList} />
   <MyInfoEditTabs.Screen
    name="MyTaxInvoiceList"
    component={MyTaxInvoiceList}
   />
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
     headerShown: true,
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
