import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";
import TransContainer from "./TransContainer";
import { useIsLoggedIn, useLogIn, useLogOut } from "../../AuthContext";

const styles = StyleSheet.create({
 centeredView: {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: 22,
  backgroundColor: "rgba(0,0,0,0.5)",
 },
 modalView: {
  flex: 0,
  width: "100%",
  backgroundColor: "white",
  padding: 5,
  alignItems: "center",
 },
 modalInnerView: {
  alignItems: "center",
  borderWidth: 1,
  width: "100%",
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
  marginBottom: 15,
  textAlign: "center",
 },
 modalBody: {
  textAlign: "center",
 },
});

const CancelBtn = styled.TouchableOpacity`
 flex: 0.3;
 align-items: center;
 justify-content: center;
 background-color: whitesmoke;
 height: 50px;
`;
const ConfirmBtn = styled.TouchableOpacity`
 flex: 0.7;
 align-items: center;
 justify-content: center;
 background-color: #3a99fc;
 height: 50px;
`;
const ConfirmBtnText = styled.Text`
 text-align: center;
 color: white;
 font-weight: bold;
 font-size: 24px;
`;

const DataHeader = styled.View`
 flex-direction: column;
 justify-content: center;
 align-items: center;
 padding-top: 10px;
 width: 100%;
`;
const DataBody = styled.View`
 padding-left: 10px;
 padding-right: 10px;
 padding-bottom: 10px;
 flex-direction: column;
 justify-content: flex-start;
 align-items: flex-start;
 width: 100%;
`;

const EtcInput = styled.TextInput`
 border-width: 1px;
 border-color: grey;
 text-align: left;
 text-align-vertical: top;
 height: 150px;
 width: 100%;
`;

const Stack = createStackNavigator();

export default () => {
 const logOut = useLogOut();
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
