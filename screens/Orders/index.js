import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import OrdersContainer from "./OrdersContainer";
import MessagesLink from "../../components/MessageLink";
import { useIsLoggedIn, useLogIn, useLogOut } from "../../AuthContext";
import { TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

export default () => {
 const logOut = useLogOut();
 return (
  <Stack.Navigator
   mode="modal"
   screenOptions={{
    gestureEnabled: true,
    headerStyle: {
     backgroundColor: "#3a99fc",
     shadowColor: "black",
     borderBottomColor: "silver",
    },
    headerTintColor: "white",
    headerBackTitleVisible: false,
   }}
  >
   <Stack.Screen
    name="용차블루"
    component={OrdersContainer}
    options={{
     headerTitleStyle: { marginLeft: -20, paddingLeft: 0 },
     headerLeft: () => (
      <FontAwesome5
       name="truck-moving"
       size={24}
       color="white"
       style={{
        marginLeft: 10,
        transform: [{ rotate: "-15deg" }],
       }}
      />
     ),
     headerRight: () => (
      <TouchableOpacity onPress={logOut}>
       <FontAwesome5
        name="sign-out-alt"
        size={24}
        color="white"
        style={{
         marginRight: 10,
        }}
       />
      </TouchableOpacity>
     ),
     //headerRight: () => <MessagesLink />,
    }}
   />
  </Stack.Navigator>
 );
};
