import React from "react";
import {View, Text} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

const TaxBillDetailStacks = createStackNavigator();
const DocketFormStacks = createStackNavigator();

const TaxBillContainer = ({ navigation, route}) => {
  return (
    <DocketFormStacks.Navigator>
      <DocketFormStacks.Screen name="TS 기본" />
      <DocketFormStacks.Screen name="LF 기본" />
      <DocketFormStacks.Screen name="LF 이디야" />
      <DocketFormStacks.Screen name="용차" />

    </DocketFormStacks.Navigator>
  )
}


export default ({navigation, route}) => {
  return (
    <>
    <TaxBillDetailStacks.Navigator>

    <TaxBillDetailStacks.Screen
    name="TaxBillDetail"
    component={TaxBillContainer}
    options={{
      title: "세금계산서",
      headerStyle: {
        backgroundColor: "#3e50b4",
      },
      headerTitleStyle: {
        textAlign: "center",
        marginLeft: -44,
        paddingLeft: 0,
        fontSize: 24,
        color: "white",
      },
      headerTintColor: "white",
      headerBackTitleVisible: false,
      headerShown: true,
    }}
    >
      
    </TaxBillDetailStacks.Screen>
    </TaxBillDetailStacks.Navigator>

    </>
  )
}