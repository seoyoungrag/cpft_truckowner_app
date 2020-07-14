import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Movies";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";

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
  }}
 >
  <Stack.Screen name="Tabs" component={Tabs} />
  <Stack.Screen name="Detail" component={Detail} />
 </Stack.Navigator>
);
