import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tutorial from "../screens/Tutorial";

const TutorialNavigation = createStackNavigator();

export default () => (
 <NavigationContainer independent={true}>
  <TutorialNavigation.Navigator
   screenOptions={{
    headerShown: false,
   }}
  >
   <TutorialNavigation.Screen name="Tutorial" component={Tutorial} />
  </TutorialNavigation.Navigator>
 </NavigationContainer>
);
