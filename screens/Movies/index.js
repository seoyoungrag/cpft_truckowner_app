import React from "react";
import { TouchableOpacity, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieContainer from "./MoviesContainer";

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
  <Stack.Screen
   name="Movies"
   component={MovieContainer}
   options={{
    headerRight: () => (
     <Button
      onPress={() => alert("This is a button!")}
      title="Info"
      color="white"
     />
    ),
   }}
  />
 </Stack.Navigator>
);
