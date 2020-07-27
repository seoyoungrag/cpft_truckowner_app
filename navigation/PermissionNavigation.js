import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Permission from "../screens/Permission";

const PermissionNavigation = createStackNavigator();

export default () => (
 <NavigationContainer independent={true}>
  <PermissionNavigation.Navigator
   screenOptions={{
    headerShown: false,
   }}
  >
   <PermissionNavigation.Screen name="Permission" component={Permission} />
  </PermissionNavigation.Navigator>
 </NavigationContainer>
);
