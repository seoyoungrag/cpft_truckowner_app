import React, { useState, useEffect, useRef } from "react";
import {
 Dimensions,
 Text,
 TouchableOpacity,
 Modal,
 View,
 StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import YearMonthPicker from "../../components/YearMonthPicker";
import HorizontalTrans from "../../components/HorizontalTrans";
import ScrollContainer from "../../components/ScrollContainer";
import { code, trimText } from "../../utils";
import { useIsModal, useSetIsModalProp } from "../../ModalContext";
import { useCodes } from "../../CodeContext";
import {
 useUserRegistInfo,
 useGetUserRegistInfo,
 useSetUserRegistInfo,
} from "../../UserRegistContext";
import styled from "styled-components/native";
import HorizontalTransDetail from "../../components/HorizontalTransDetail";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
 centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
  width: width,
  height: height,
  backgroundColor: "rgba(0,0,0,0.5)",
 },
 modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
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
  marginBottom: 15,
  textAlign: "center",
 },
 modalBody: {
  marginBottom: 15,
  textAlign: "center",
 },
});

const OuterContainer = styled.SafeAreaView`
 flex: 1;
`;

const Detail = styled.View`
 flex: 1;
 flex-direction: column;
 background-color: white;
`;

const DetailHeader = styled.View`
 padding-left: 20px;
 padding-right: 20px;
 margin-top: ${Constants.statusBarHeight}px;
 align-items: center;
 flex-direction: row;
 justify-content: space-between;
`;

export default ({ refreshFn, loading, order, year, month }) => {
 const navigation = useNavigation();
 const codes = useCodes();
 const getUserRegistInfo = useGetUserRegistInfo();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const [monthPickerModalVisible, setMonthPickerModalVisible] = useState(false);
 const [startYear, setStartYear] = useState(2020);
 const [endYear, setEndYear] = useState(2020);
 const [selectedYear, setSelectedYear] = useState(2020);
 const [selectedMonth, setSelectedMonth] = useState(8);
 const monthPicker = useRef();
 const showPicker = () => {
  monthPicker.current
   .show({ startYear, endYear, selectedYear, selectedMonth })
   .then(({ year, month }) => {
    setSelectedYear(year);
    setSelectedMonth(month);
   });
 };
 const fetchData = async () => {
  const data = await getUserRegistInfo();
  setUserRegistInfoProp(data);
 };

 const goToTransDetail = (order) => {
  navigation.navigate("TransDetail", {
   year: selectedYear,
   month: selectedMonth,
   orderSeq: order.orderSeq,
   opratSctn: order.opratSctn,
   workingArea: order.workingArea,
   rcritType: order.rcritType,
   carTypes: order.carTypes,
   tonType: order.tonType,
   dlvyPrdlst: order.dlvyPrdlst,
   payAmt: order.payAmt,
   payFullType: order.payFullType,
   workHourStart: order.workHourStart,
   workMinuteStart: order.workMinuteStart,
   workHourEnd: order.workHourEnd,
   workMinuteEnd: order.workMinuteEnd,
   detailMatter: order.detailMatter,
   workDays: order.workDays,
  });
 };

 useEffect(() => {
  const unsubscribe = navigation.addListener("focus", async () => {
   if (!userRegistInfo) {
    await fetchData();
   } else {
   }
  });
  return unsubscribe;
 }, [navigation]);

 useEffect(() => {
  if (monthPickerModalVisible) {
   showPicker();
  }
 }, [monthPickerModalVisible]);
 return (
  <OuterContainer>
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
   <Detail>
    <DetailHeader>
     <TouchableOpacity
      style={{
       width: 40,
       height: 40,
       justifyContent: "center",
      }}
      onPress={() => {
       navigation.pop();
      }}
     >
      <AntDesign name={"leftcircle"} color={"black"} size={24} />
     </TouchableOpacity>
     <Text style={{ color: "#3a99fc", fontSize: 20 }}>
      {year}년 {month}월
     </Text>
     <TouchableOpacity
      onPress={() => {
       setMonthPickerModalVisible(true);
       //showPicker();
      }}
     >
      <FontAwesome5 name="calendar-alt" size={24} color="#3a99fc" />
     </TouchableOpacity>
     {/*<DetailHeaderTitle>1/5</DetailHeaderTitle>*/}
    </DetailHeader>
    <HorizontalTransDetail
     refreshFn={refreshFn}
     loading={loading}
     key={order.orderSeq}
     id={order.orderSeq}
     opratSctn={order.opratSctn}
     workingArea={order.workingArea}
     rcritType={code(codes, order.rcritType)}
     carTypes={order.carTypes
      .map((c) => {
       return code(codes, c) + " ";
      })
      .join(" ")}
     tonType={code(codes, order.tonType)}
     dlvyPrdlst={order.dlvyPrdlst}
     payAmt={order.payAmt}
     payFullType={code(codes, order.payFullType)}
     workHourStart={(order.workHourStart + "").padStart(2, "0")}
     workMinuteStart={(order.workMinuteStart + "").padStart(2, "0")}
     workHourEnd={(order.workHourEnd + "").padStart(2, "0")}
     workMinuteEnd={(order.workMinuteEnd + "").padStart(2, "0")}
     detailMatter={order.detailMatter}
     workDays={
      order?.workDays &&
      order.workDays
       .map((c) => {
        return code(codes, c) + " ";
       })
       .join(",")
     }
     order={order}
    />
   </Detail>
  </OuterContainer>
 );
};
