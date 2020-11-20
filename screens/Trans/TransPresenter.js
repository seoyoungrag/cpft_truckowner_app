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
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalTrans from "../../components/HorizontalTrans";
import ScrollContainer from "../../components/ScrollContainer";
import { code } from "../../utils";
import { useIsModal } from "../../ModalContext";
import { useCodes } from "../../CodeContext";
import { useGetUserRegistInfo } from "../../UserRegistContext";
import MonthPicker from 'react-native-month-year-picker';
import YearMonthPicker from "../../components/YearMonthPicker";
import * as Calc from "../../components/Calc";
import TransCard from "./TransCard";
import axios from "axios";
import * as rq from "react-query";
import { getAnythingCpft, postAnythingCpft } from "../../api";

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

export default ({ refreshFn, loading, now }) => {

 const navigation = useNavigation();
 const codes = useCodes();
 const getUserRegistInfo = useGetUserRegistInfo();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const [modalVisible, setModalVisible] = useState(false);
 const [monthPickerModalVisible, setMonthPickerModalVisible] = useState(false);
 const [startYear, setStartYear] = useState(2020);
 const [endYear, setEndYear] = useState(2020);
 const [selectedYear, setSelectedYear] = useState(2020);
 const [selectedMonth, setSelectedMonth] = useState(8);
 const monthPicker = useRef();

 const targetMonthRef = useRef(new Date());

 const fetchData = async () => {
  const data = await getUserRegistInfo();
  setUserRegistInfoProp(data);
 };

 const dummyArray = [1,2,3,4,5];

 const [targetDate, setTargetDate] = useState(new Date());
 const [isMonthPickerShow, setIsMonthPickerShow] = useState(false);

 const dateChange = React.useCallback((e, newDate) => {
  const date = newDate || targetDate;
  setIsMonthPickerShow(false);
  setTargetDate(date);
  targetMonthRef.current = date;
  rq.queryCache.invalidateQueries("getTransList");
 }, [targetDate]);


 const goToTransDetail = (order, tmpKey) => {
  navigation.navigate("TransDetail", {
   year: selectedYear,
   month: selectedMonth,
   orderSeq: order.orderSeq,
   opratSctn: order.opratSctn,
   workArea: order.workArea,
   rcritType: order.rcritType,
   carTypes: order.carTypes,
   tonType: order.tonType,
   dlvyPrdlst: order.dlvyPrdlst,
   salary: order.salary,
   expensYn: order.expensYn,
   workHourStart: order.workHourStart,
   workMinuteStart: order.workMinuteStart,
   workHourEnd: order.workHourEnd,
   workMinuteEnd: order.workMinuteEnd,
   detailMatter: order.detailMatter,
   workDays: order.workDays,
   tmpKey,
  });
 };
 const showPicker = () => {
  monthPicker.current
   .show({ startYear, endYear, selectedYear, selectedMonth })
   .then(({ year, month }) => {
    setSelectedYear(year);
    setSelectedMonth(month);
   });
 };
 useEffect(() => {
  if (monthPickerModalVisible) {
   showPicker();
  }
 }, [monthPickerModalVisible]);
 useEffect(() => {
  const unsubscribe = navigation.addListener("focus", async () => {
   if (!userRegistInfo) {
    await fetchData();
   } else {
   }
  });
  return unsubscribe;
 }, [navigation]);

 const getTransList = async (url) => {
   const {data} = await axios.get(url)
 };


 const dataInfo = rq.useQuery("getTransList", async () => {
   const {data} = await axios.post("http://172.126.11.154:82/v2/trans/getTransList" ,{
     targetMonth: targetMonthRef.current.toISOString(),
   });
   return data;
 }, {
   enabled: targetDate,
   retry: 0,
   refetchOnWindowFocus: false,
   onSuccess: (data) => {}
 });

 return (
  <>
   <Modal
    animationType="fade"
    hardwareAccelerated={true}
    transparent={true}
    statusBarTranslucent={true}
    visible={modalVisible}
   >
    <View style={styles.centeredView}>
     <View style={styles.modalView}>
      <Text style={styles.modalTItle}>보기 권한</Text>

      <Text style={styles.modalBody}>
       차량정보 입력한 회원만 볼 수 있습니다. {"\r\n"}마저 등록하러
       가시겠습니까?
      </Text>
      <View style={{ flexDirection: "row" }}>
       <TouchableOpacity
        style={{
         ...styles.openButton,
         backgroundColor: "white",
         marginRight: 10,
        }}
        onPress={() => {
         setModalVisible(!modalVisible);
        }}
       >
        <Text style={[styles.textStyle, { color: "#2196F3" }]}>아니오</Text>
       </TouchableOpacity>
       <TouchableOpacity
        style={{
         ...styles.openButton,
         backgroundColor: "#2196F3",
        }}
        onPress={() => {
         navigation.navigate("추가정보입력", {
          isFromOrder: true,
         });
         setModalVisible(!modalVisible);
        }}
       >
        <Text style={styles.textStyle}>예</Text>
       </TouchableOpacity>
      </View>
     </View>
    </View>
   </Modal>
   <View>
    <View
     style={{
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "white",
      width: width,
      paddingLeft: 20,
     }}
    >
     {/* <Text
      style={{ color: "#3e50b4", fontSize: 13, textAlignVertical: "center" }}
     >
      {Calc.getMonthStr(targetDate)}월
     </Text> */}
    </View>
    <View
     style={{
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "white",
      width: width,
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
      <Text style={{ color: "#0d0d0d", fontSize: 24 }}>{Calc.getMonthStr(targetDate)}월</Text>
      <TouchableOpacity
       onPress={() => {
        // setMonthPickerModalVisible(true);
        setIsMonthPickerShow(true);
       }}
      >
       <FontAwesome5
        name="calendar-alt"
        size={24}
        color="#3e50b4"
        style={{ paddingHorizontal: 20 }}
       />
      </TouchableOpacity>
      {isMonthPickerShow && <MonthPicker 
          minimumDate={new Date(2000, 5)}
          maximumDate={new Date(2025, 5)} onChange={dateChange} value={targetDate} locale="ko" />}
     </View>
    </View>
    {/* <Modal
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
    </Modal> */}
    
   </View>
   <ScrollContainer
    refreshOn={true}
    refreshFn={refreshFn}
    loading={loading}
    contentContainerStyle={{
     backgroundColor: useIsModal() ? "rgba(0,0,0,0.5)" : "white",
     paddingTop: 10,
     paddingBottom: 50,
    }}
   >
    {dataInfo.status === "success" && dataInfo.data.list.map((data, index) => <TransCard key={index} data={data} targetMonth={Calc.getMonthStr(targetDate)} />)}
    {/* {now.map((n, i) => (
     <HorizontalTrans
      tmpKey={i}
      key={n.orderSeq}
      id={n.orderSeq}
      opratSctn={n.opratSctn}
      workArea={n.workArea}
      rcritType={code(codes, n.rcritType)}
      carTypes={n.carTypes.map((c) => {
       return code(codes, c) + " ";
      })}
      tonType={code(codes, n.tonType)}
      dlvyPrdlst={n.dlvyPrdlst}
      salary={n.salary}
      expensYn={code(codes, n.expensYn)}
      goToTransDetail={() => {
       goToTransDetail(n, i);
      }}
     />
    ))}
    {now.map((n, i) => (
     <HorizontalTrans
      tmpKey={i}
      key={n.orderSeq}
      id={n.orderSeq}
      opratSctn={n.opratSctn}
      workArea={n.workArea}
      rcritType={code(codes, n.rcritType)}
      carTypes={n.carTypes.map((c) => {
       return code(codes, c) + " ";
      })}
      tonType={code(codes, n.tonType)}
      dlvyPrdlst={n.dlvyPrdlst}
      salary={n.salary}
      expensYn={code(codes, n.expensYn)}
      goToTransDetail={() => {
       goToTransDetail(n, i);
      }}
     />
    ))} */}
   </ScrollContainer>
  </>
 );
};
