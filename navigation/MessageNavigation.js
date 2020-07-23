import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";

const Stack = createStackNavigator();

export default () => (
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
  <Stack.Screen name="Messages" component={Messages} />
  <Stack.Screen name="Message" component={Message} />
 </Stack.Navigator>
);
