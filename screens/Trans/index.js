import React, { useEffect, useState, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import OrdersContainer from "./OrdersContainer";
import { useIsLoggedIn, useLogIn, useLogOut } from "../../AuthContext";
import { TouchableOpacity, View, Dimensions, Text } from "react-native";
import YearMonthPicker from "../../components/YearMonthPicker";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const Stack = createStackNavigator();

export default () => {
 const [startYear, setStartYear] = useState(2020);
 const [endYear, setEndYear] = useState(2020);
 const [selectedYear, setSelectYear] = useState(2020);
 const [selectedMonth, setSelectedMonth] = useState(8);
 const showPicker = () => {
  this.picker
   .show({ startYear, endYear, selectedYear, selectedMonth })
   .then(({ year, month }) => {
    this.setState({
     selectedYear: year,
     selectedMonth: month,
    });
   });
 };
 const logOut = useLogOut();
 return (
  <Stack.Navigator mode="modal">
   <Stack.Screen
    name="운송메인"
    component={OrdersContainer}
    options={{
     headerTitleContainerStyle: {
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
         2020년
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
         <Text style={{ color: "white", fontSize: 24 }}>7월</Text>
         <TouchableOpacity onPress={() => console.log(this)}>
          <FontAwesome5
           name="calendar-alt"
           size={24}
           color="white"
           style={{ paddingHorizontal: 20 }}
          />
         </TouchableOpacity>
         <YearMonthPicker ref={(picker) => (this.picker = picker)} />
        </View>
        <View>
         <TouchableOpacity onPress={logOut}>
          <FontAwesome5 name="sign-out-alt" size={24} color="white" />
         </TouchableOpacity>
        </View>
       </View>
      </View>
     ),
    }}
   />
  </Stack.Navigator>
 );
};
