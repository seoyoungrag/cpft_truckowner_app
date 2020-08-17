import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import TransContainer from "./TransContainer";
import { useLogOut } from "../../AuthContext";
import { useGetUserRegistInfo } from "../../UserRegistContext";
import { useNavigation } from "@react-navigation/native";
import JiraIssueCollectModal from "../../components/JiraIssueCollectModal";

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
    gestureEnabled: true,
    headerStyle: {
     backgroundColor: "white",
     shadowColor: "black",
     borderBottomColor: "silver",
    },
    headerTintColor: "#3a99fc",
    headerBackTitleVisible: false,
   }}
  >
   <Stack.Screen
    name="용차블루"
    component={TransContainer}
    options={{
     headerTitleStyle: { marginLeft: -20, paddingLeft: 0 },
     headerLeft: () => (
      <FontAwesome5
       name="truck-moving"
       size={24}
       color="#3a99fc"
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
        <Text style={{ marginRight: 20, color: "#3a99fc" }}>
         테스트 피드백 보내기
         <MaterialIcons
          name="feedback"
          size={24}
          color="#3a99fc"
          style={{
           marginRight: 10,
          }}
         />
        </Text>
       </TouchableOpacity>
       <JiraIssueCollectModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        menuName={"배송메뉴"}
       />
       <TouchableOpacity onPress={logOut}>
        <FontAwesome5
         name="sign-out-alt"
         size={24}
         color="#3a99fc"
         style={{
          marginRight: 10,
         }}
        />
       </TouchableOpacity>
      </View>
     ),
     /*headerTitleContainerStyle: {
      margin: 0,
      padding: 0,
      backgroundColor: "red",
      left: 0,
      top: 0,
      width: "100%",
     },
     headerTitle: () => (
      <View style={{ flex: 1, backgroundColor: "red", height: "100%" }}>
       <View
        style={{
         flex: 1,
         alignItems: "center",
         flexDirection: "row",
         backgroundColor: "white",
         width: WIDTH,
         paddingLeft: 20,
        }}
       >
        <Text
         style={{ color: "#3a99fc", fontSize: 13, textAlignVertical: "center" }}
        >
         {selectedYear}년
        </Text>
       </View>
       <View
        style={{
         flex: 1,
         alignItems: "center",
         flexDirection: "row",
         backgroundColor: "#3a99fc",
         width: WIDTH,
         paddingLeft: 20,
         paddingRight: 20,
         paddingVertical: 3,
         justifyContent: "space-between",
        }}
       >
        <View
         style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
         }}
        >
         <Text style={{ color: "white", fontSize: 24 }}>{selectedMonth}월</Text>
         <TouchableOpacity
          onPress={() => {
           setMonthPickerModalVisible(true);
           //showPicker();
          }}
         >
          <FontAwesome5
           name="calendar-alt"
           size={24}
           color="white"
           style={{ paddingHorizontal: 20 }}
          />
         </TouchableOpacity>
        </View>
        <View>
         <TouchableOpacity onPress={logOut}>
          <FontAwesome5 name="sign-out-alt" size={24} color="white" />
         </TouchableOpacity>
        </View>
       </View>
       <Modal
        animationType="fade"
        hardwareAccelerated={true}
        transparent={true}
        statusBarTranslucent={true}
        visible={monthPickerModalVisible}
       >
        <View behavior="padding" enabled style={styles.centeredView}>
         <YearMonthPicker
          ref={monthPicker}
          dismissFnc={() => {
           setMonthPickerModalVisible(false);
          }}
         />
        </View>
       </Modal>
      </View>
     ),*/
    }}
   />
  </Stack.Navigator>
 );
};
