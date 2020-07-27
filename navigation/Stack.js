import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "./AuthNavigation";
import PermissionNavigation from "./PermissionNavigation";
import { TouchableOpacity, Text } from "react-native";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import {
 useHasCameraPermission,
 useHasFilePermission,
 useHasPhonePermission,
} from "../PermissionContext";

const Stack = createStackNavigator();

export default () => {
 const isLoggedIn = useIsLoggedIn();
 const hasCameraPermission = useHasCameraPermission();
 const hasPhonePermission = useHasPhonePermission();
 const hasFilePermission = useHasFilePermission();
 //const isLoggedIn = true;
 const logIn = useLogIn();
 const logOut = useLogOut();
 console.log(
  "!!!!!!!!!!!",
  hasCameraPermission,
  hasPhonePermission,
  hasFilePermission
 );
 return isLoggedIn ? (
  hasCameraPermission != "undetermined" &&
  hasPhonePermission != "undetermined" &&
  hasFilePermission != "undetermined" ? (
   <>
    <TouchableOpacity onPress={logOut}>
     <Text>로그아웃</Text>
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
      <Stack.Screen name="MessageNavigation" component={MessageNavigation} />
     </Stack.Navigator>
    </NavigationContainer>
   </>
  ) : (
   <PermissionNavigation />
  )
 ) : (
  <AuthNavigation />
 );
};
