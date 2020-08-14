import React, { useState, useEffect } from "react";
import {
 Modal,
 TouchableOpacity,
 View,
 Text,
 StyleSheet,
 Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import OrdersContainer from "./OrdersContainer";
import MessagesLink from "../../components/MessageLink";
import { useIsLoggedIn, useLogIn, useLogOut } from "../../AuthContext";
import {
 useUserRegistInfo,
 useGetUserRegistInfo,
 useSetUserRegistInfo,
} from "../../UserRegistContext";
import { useNavigation } from "@react-navigation/native";
import JiraIssueCollectModal from "../../components/JiraIssueCollectModal";

const Stack = createStackNavigator();

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
 centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "flex-end",
 },
 modalView: {
  marginBottom: 0,
  paddingBottom: 22,
  backgroundColor: "white",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
   width: 0,
   height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
 },
 openButton: {
  backgroundColor: "#F194FF",
  borderRadius: 10,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
  elevation: 2,
 },
 textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  marginLeft: 20,
  marginRight: 20,
  marginTop: 5,
  marginBottom: 5,
 },
 modalTItle: {
  fontSize: 24,
  marginLeft: 5,
  textAlign: "center",
 },
 modalBody: {
  marginBottom: 15,
  textAlign: "center",
 },
});

export default () => {
 const navigation = useNavigation();
 const getUserRegistInfo = useGetUserRegistInfo();
 const logOut = useLogOut();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const fetchData = async () => {
  const data = await getUserRegistInfo();
  setUserRegistInfoProp(data);
 };
 const [modalVisible, setModalVisible] = useState(false);
 const INJECTED_JAVASCRIPT = `(function() {
     //document.querySelector('#fullname').style.backgroundColor = 'red';
     document.querySelectorAll('.group').forEach(e => e.style.display="none");
     document.querySelector('#fullname').value="${userRegistInfo?.userNm}";
     document.querySelector('#email').value="오더";
     document.querySelector('#recordWebInfoConsent').checked = true;
     document.querySelector('#name-group').style.display="none";
     document.querySelector('#email-group').style.display="none";
     document.querySelector('#record-web-info-consent-container').style.display="none";     
 })();`;
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
    component={OrdersContainer}
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
     //headerRight: () => <MessagesLink />,
    }}
   />
  </Stack.Navigator>
 );
};
