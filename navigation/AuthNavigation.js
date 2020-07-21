import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator();

export default () => (
 <NavigationContainer independent={true}>
  <AuthNavigation.Navigator
   screenOptions={{
    headerShown: false,
   }}
  >
   <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
   <AuthNavigation.Screen name="Signup" component={Signup} />
   <AuthNavigation.Screen name="Login" component={Login} />
   <AuthNavigation.Screen name="Confirm" component={Confirm} />
  </AuthNavigation.Navigator>
 </NavigationContainer>
);
