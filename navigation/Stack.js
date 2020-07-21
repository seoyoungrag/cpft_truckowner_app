import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "./AuthNavigation";
import { TouchableOpacity, Text, Button } from "react-native";
import PhotoNavigation from "./PhotoNavigation";

const Stack = createStackNavigator();

export default () => {
 //const isLoggedIn = useIsLoggedIn();
 const isLoggedIn = true;
 const logIn = useLogIn();
 const logOut = useLogOut();
 return isLoggedIn ? (
  <>
   <TouchableOpacity onPress={logOut}>
    <Text>Log Out</Text>
   </TouchableOpacity>

   <NavigationContainer independent={true}>
    <Stack.Navigator
     mode="modal"
     screenOptions={{
      gestureEnabled: true,
      headerStyle: {
       backgroundColor: "black",
       shadowColor: "black",
       borderBottomColor: "black",
      },
      headerTintColor: "white",
      headerBackTitleVisible: false,
      headerShown: false,
     }}
    >
     <Stack.Screen name="Tabs" component={Tabs} />
     <Stack.Screen name="Detail" component={Detail} />
     <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
    </Stack.Navigator>
   </NavigationContainer>
  </>
 ) : (
  <AuthNavigation />
 );
};
