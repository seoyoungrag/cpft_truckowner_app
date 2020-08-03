import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersContainer from "./OrdersContainer";
import MessagesLink from "../../components/MessageLink";
import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createStackNavigator();
export default () => (
 <Stack.Navigator
  mode="modal"
  screenOptions={{
   gestureEnabled: true,
   headerStyle: {
    backgroundColor: "#3a99fc",
    shadowColor: "black",
    borderBottomColor: "silver",
   },
   headerTintColor: "white",
   headerBackTitleVisible: false,
  }}
 >
  <Stack.Screen
   name="용차블루"
   component={OrdersContainer}
   options={{
    headerTitleStyle: { marginLeft: -20, paddingLeft: 0 },
    headerLeft: () => (
     <FontAwesome5
      name="truck-moving"
      size={24}
      color="white"
      style={{
       marginLeft: 10,
       transform: [{ rotate: "-15deg" }],
      }}
     />
    ),
    //headerRight: () => <MessagesLink />,
   }}
  />
 </Stack.Navigator>
);
