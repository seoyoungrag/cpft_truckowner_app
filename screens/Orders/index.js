import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import OrdersContainer from "./OrdersContainer";
import { useLogOut } from "../../AuthContext";
import { useGetUserRegistInfo } from "../../UserRegistContext";
import { useNavigation } from "@react-navigation/native";
import JiraIssueCollectModal from "../../components/JiraIssueCollectModal";

import { getStatusBarHeight } from "react-native-status-bar-height";

const statusBarHeight = getStatusBarHeight();

const Stack = createStackNavigator();

export default () => {
 const logOut = useLogOut();
 const navigation = useNavigation();
 const getUserRegistInfo = useGetUserRegistInfo();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const fetchData = async () => {
  const data = await getUserRegistInfo();
  setUserRegistInfoProp(data);
 };
 const [modalVisible, setModalVisible] = useState(false);

 useEffect(() => {
  const unsubscribe = navigation.addListener("focus", async () => {
   if (!userRegistInfo) {
    await fetchData();
   } else {
   }
  });
  return unsubscribe;
 }, [navigation]);
 return (
  <Stack.Navigator
   mode="modal"
   screenOptions={{
    headerShown: true,
    gestureEnabled: true,
    headerStyle: {
     backgroundColor: "white",
     shadowColor: "black",
     borderBottomColor: "silver",
     height: statusBarHeight * 2,
    },
    headerTintColor: "#3e50b4",
    headerBackTitleVisible: false,
   }}
  >
   <Stack.Screen
    name="용차블루"
    component={OrdersContainer}
    options={{
     headerStatusBarHeight: statusBarHeight,
     headerTitleStyle: {
      marginLeft: -20,
      paddingLeft: 0,
     },
     headerLeft: () => (
      <FontAwesome5
       name="truck-moving"
       size={24}
       color="#3e50b4"
       style={{
        marginLeft: 10,
        transform: [{ rotate: "-15deg" }],
       }}
      />
     ),
     headerRight: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
       <TouchableOpacity
        onPress={() => {
         setModalVisible(true);
        }}
       >
        <Text style={{ marginRight: 20, color: "#3e50b4" }}>
         테스트 피드백 보내기
         <MaterialIcons
          name="feedback"
          size={24}
          color="#3e50b4"
          style={{
           marginRight: 10,
          }}
         />
        </Text>
       </TouchableOpacity>
       <JiraIssueCollectModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        menuName={"오더메뉴"}
       />
       <TouchableOpacity onPress={logOut}>
        <FontAwesome5
         name="sign-out-alt"
         size={24}
         color="#3e50b4"
         style={{
          marginRight: 10,
         }}
        />
       </TouchableOpacity>
      </View>
     ),
     //headerRight: () => <MessagesLink />,
    }}
   />
  </Stack.Navigator>
 );
};
