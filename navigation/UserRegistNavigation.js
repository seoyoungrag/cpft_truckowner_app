import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import UserStep1 from "../screens/UserRegist/UserStep1";
import UserStep2 from "../screens/UserRegist/UserStep2";
import UserStep3 from "../screens/UserRegist/UserStep3";
import UserStep4 from "../screens/UserRegist/UserStep4";
import UserStep5 from "../screens/UserRegist/UserStep5";

const UserRegistlNavigation = createStackNavigator();

export default () => (
 <NavigationContainer independent={true}>
  <UserRegistlNavigation.Navigator
   screenOptions={{
    headerShown: false,
   }}
  >
   <UserRegistlNavigation.Screen name="UserStep1" component={UserStep1} />
   <UserRegistlNavigation.Screen name="UserStep2" component={UserStep2} />
   <UserRegistlNavigation.Screen name="UserStep3" component={UserStep3} />
   <UserRegistlNavigation.Screen name="UserStep4" component={UserStep4} />
   <UserRegistlNavigation.Screen name="UserStep5" component={UserStep5} />
  </UserRegistlNavigation.Navigator>
 </NavigationContainer>
);
