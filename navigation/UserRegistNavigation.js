import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import UserStep1 from "../screens/UserRegist/UserStep1";
import UserStep1HPA1 from "../screens/UserRegist/UserStep1HPA1";
import UserStep1HPA2 from "../screens/UserRegist/UserStep1HPA2";
import UserStep1HPA3 from "../screens/UserRegist/UserStep1HPA3";
import UserStep1HPA4 from "../screens/UserRegist/UserStep1HPA4";
import UserStep2 from "../screens/UserRegist/UserStep2";
import UserStep3 from "../screens/UserRegist/UserStep3";
import UserStep4 from "../screens/UserRegist/UserStep4";
import UserStep5 from "../screens/UserRegist/UserStep5";

const UserRegistlNavigation = createStackNavigator();

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
 <NavigationContainer independent={true}>
  <UserRegistlNavigation.Navigator
   screenOptions={{
    headerShown: false,
   }}
  >
   <UserRegistlNavigation.Screen
    name="UserStep1"
    component={UserStep1}
    options={{
     transitionSpec: {
      open: config,
      close: config,
     },
     cardStyleInterpolator: forFade,
    }}
   />
   <UserRegistlNavigation.Screen
    name="UserStep1HPA1"
    component={UserStep1HPA1}
   />
   <UserRegistlNavigation.Screen
    name="UserStep1HPA2"
    component={UserStep1HPA2}
   />
   <UserRegistlNavigation.Screen
    name="UserStep1HPA3"
    component={UserStep1HPA3}
   />
   <UserRegistlNavigation.Screen
    name="UserStep1HPA4"
    component={UserStep1HPA4}
   />
   <UserRegistlNavigation.Screen
    name="UserStep2"
    component={UserStep2}
    options={{
     transitionSpec: {
      open: config,
      close: config,
     },
     cardStyleInterpolator: forFade,
    }}
   />
   <UserRegistlNavigation.Screen
    name="UserStep3"
    component={UserStep3}
    options={{
     transitionSpec: {
      open: config,
      close: config,
     },
     cardStyleInterpolator: forFade,
    }}
   />
   <UserRegistlNavigation.Screen
    name="UserStep4"
    component={UserStep4}
    options={{
     transitionSpec: {
      open: config,
      close: config,
     },
     cardStyleInterpolator: forFade,
    }}
   />
   <UserRegistlNavigation.Screen
    name="UserStep5"
    component={UserStep5}
    options={{
     transitionSpec: {
      open: config,
      close: config,
     },
     cardStyleInterpolator: forFade,
    }}
   />
  </UserRegistlNavigation.Navigator>
 </NavigationContainer>
);
