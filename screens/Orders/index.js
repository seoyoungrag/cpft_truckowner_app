import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import OrdersContainer from "./OrdersContainer";
import MessagesLink from "../../components/MessageLink";
import UserStep4 from "../UserRegist/UserStep4";
import UserStep4AddrFindView from "../UserRegist/UserStep4AddrFindView";

const Stack = createStackNavigator();
const config = {
 animation: "spring",
 config: {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
 },
};

const forFade = ({ current, closing }) => ({
 cardStyle: {
  opacity: current.progress,
 },
});

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
  <Stack.Screen
   name="추가정보입력"
   component={UserStep4}
   options={{
    transitionSpec: {
     open: config,
     close: config,
    },
    cardStyleInterpolator: forFade,
    headerShown: false,
   }}
  />
  <Stack.Screen
   name="UserStep4AddrFindView"
   component={UserStep4AddrFindView}
   options={{
    transitionSpec: {
     open: config,
     close: config,
    },
    cardStyleInterpolator: forFade,
    headerShown: false,
   }}
  />
 </Stack.Navigator>
);
