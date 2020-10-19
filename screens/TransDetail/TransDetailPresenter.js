import React, { useState, useEffect, useRef } from "react";
import {
 Dimensions,
 Text,
 TouchableOpacity,
 Modal,
 View,
 StyleSheet,
 KeyboardAvoidingView,
 Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import YearMonthPicker from "../../components/YearMonthPicker";
import { code } from "../../utils";
import { useCodes } from "../../CodeContext";
import { useGetUserRegistInfo } from "../../UserRegistContext";
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

const EtcInput = styled.TextInput`
 border-width: 1px;
 border-color: grey;
 text-align: left;
 text-align-vertical: top;
 height: 150px;
 width: 100%;
`;
const titleFontSize = "16";
const titleBorderWidth = "1";
const DataHeaderBottomTitleContainer = styled.View`
 align-items: center;
 justify-content: center;
 background-color: #3e50b4;
 border-color: #3e50b4;
 width: ${titleFontSize * 3}px;
 height: ${titleFontSize * 3}px;
 border-radius: ${titleFontSize * 3}px;
 border-width: ${titleBorderWidth}px;
`;
const DataHeaderBottomTitle = styled.Text`
 text-align: center;
 color: white;
 font-size: ${titleFontSize - 2 * titleBorderWidth}px;
 line-height: ${titleFontSize -
 (Platform.OS === "ios" ? 2 * titleBorderWidth : titleBorderWidth)}px;
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

const DataBodyColumn = styled.View`
 flex-direction: column;
 justify-content: flex-start;
 align-items: flex-start;
`;

const DataBodyTitle = styled.View`
 padding-bottom: 10px;
`;

const DataBodyTitleText = styled.Text`
 font-size: 18px;
 color: grey;
`;

const DataBodyContent = styled.View`
 padding-bottom: 10px;
`;

const DataBodyContentText = styled.Text`
 font-size: 16px;
 padding-bottom: 10px;
`;

const DetailHeader = styled.View`
 padding-left: 20px;
 padding-right: 20px;
 align-items: center;
 flex-direction: row;
 justify-content: space-between;
`;
const DetailFooter = styled.View`
 flex-direction: row;
 justify-content: center;
`;

const CancelBtn = styled.TouchableOpacity`
 flex: 0.5;
 align-items: center;
 justify-content: center;
 background-color: white;
 border: 1px solid #3e50b4;
 height: 50px;
 border-radius: 5px;
`;
const ConfirmBtn = styled.TouchableOpacity`
 flex: 0.5;
 align-items: center;
 justify-content: center;
 background-color: #3e50b4;
 height: 50px;
 border-radius: 5px;
`;
const ConfirmBtnText = styled.Text`
 text-align: center;
 color: white;
 font-weight: bold;
 font-size: 16px;
`;

export default ({ refreshFn, loading, order, year, month }) => {
 const navigation = useNavigation();
 const codes = useCodes();
 const getUserRegistInfo = useGetUserRegistInfo();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const [monthPickerModalVisible, setMonthPickerModalVisible] = useState(false);
 const [applyModalVisible, setApplyModalVisible] = useState(false);
 const [queryModalVisible, setQueryModalVisible] = useState(false);
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
    visible={queryModalVisible}
   >
    <KeyboardAvoidingView
     behavior="padding"
     enabled
     style={styles.centeredView}
    >
     <View style={styles.modalView}>
      <View style={styles.modalInnerView}>
       <DataHeader></DataHeader>
       <DataBody style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
         <View style={{ flex: 1 }}></View>
         <View style={{ flex: 1, alignItems: "flex-end" }}></View>
        </View>
        <EtcInput
         underlineColorAndroid="transparent"
         placeholder="문의사항을 입력해주세요."
         placeholderTextColor="grey"
         numberOfLines={10}
         multiline={true}
        />
       </DataBody>
      </View>
     </View>

     <View style={{ flexDirection: "row", bottom: 0 }}>
      <ConfirmBtn
       onPress={() => {
        Alert.alert(
         "문의완료!",
         "문의가 완료되었습니다.",
         [{ text: "네", onPress: () => {} }],
         { cancelable: false }
        );
        setQueryModalVisible(!queryModalVisible);
       }}
      >
       <ConfirmBtnText>문의완료</ConfirmBtnText>
      </ConfirmBtn>
      <CancelBtn
       onPress={() => {
        setQueryModalVisible(!queryModalVisible);
       }}
      >
       <Text style={{ fontSize: 24 }}>취소</Text>
      </CancelBtn>
     </View>
    </KeyboardAvoidingView>
   </Modal>
   <Modal
    animationType="fade"
    hardwareAccelerated={true}
    transparent={true}
    statusBarTranslucent={true}
    visible={applyModalVisible}
   >
    <KeyboardAvoidingView
     behavior="padding"
     enabled
     style={styles.centeredView}
    >
     <View style={styles.modalView}>
      <View style={styles.modalInnerView}>
       <DataHeader>
        <DataHeaderBottomTitleContainer>
         <DataHeaderBottomTitle>{userRegistInfo?.userNm}</DataHeaderBottomTitle>
        </DataHeaderBottomTitleContainer>
        <Text style={styles.modalTItle}>{userRegistInfo?.userNm} 님</Text>
        <Text>{userRegistInfo?.userPHNumber}</Text>
        <Text>경력 3년</Text>
       </DataHeader>
       <DataBody>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
         <View style={{ flex: 1 }}>
          <DataBodyColumn>
           <DataBodyTitle>
            <DataBodyTitleText>차량 정보</DataBodyTitleText>
           </DataBodyTitle>
           <DataBodyContent>
            <DataBodyContentText>{userRegistInfo?.carNum}</DataBodyContentText>
            <DataBodyContentText>냉탑 1t</DataBodyContentText>
           </DataBodyContent>
          </DataBodyColumn>
          <DataBodyColumn>
           <DataBodyTitle>
            <DataBodyTitleText>사업자 정보</DataBodyTitleText>
           </DataBodyTitle>
           <DataBodyContent>
            <DataBodyContentText>00 운수</DataBodyContentText>
            <DataBodyContentText>{userRegistInfo?.corpNum}</DataBodyContentText>
           </DataBodyContent>
          </DataBodyColumn>
         </View>
         <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text>(30세)</Text>
         </View>
        </View>
        <EtcInput
         underlineColorAndroid="transparent"
         placeholder="상세 경력이나 메세지를 적어주세요."
         placeholderTextColor="grey"
         numberOfLines={10}
         multiline={true}
        />
       </DataBody>
      </View>
     </View>

     <View style={{ flexDirection: "row", bottom: 0 }}>
      <CancelBtn
       onPress={() => {
        setApplyModalVisible(!applyModalVisible);
       }}
      >
       <Text style={{ fontSize: 24 }}>취소</Text>
      </CancelBtn>
      <ConfirmBtn
       onPress={() => {
        Alert.alert(
         "지원완료!",
         "지원이 완료되었습니다.",
         [{ text: "네", onPress: () => {} }],
         { cancelable: false }
        );
        setApplyModalVisible(!applyModalVisible);
       }}
      >
       <ConfirmBtnText>지원완료</ConfirmBtnText>
      </ConfirmBtn>
     </View>
    </KeyboardAvoidingView>
   </Modal>

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
      <AntDesign name={"arrowleft"} color={"#303030"} size={24} />
     </TouchableOpacity>
     <Text style={{ color: "#0d0d0d", fontSize: 20 }}>
      {year}년 {month}월
     </Text>
     <TouchableOpacity
      onPress={() => {
       setMonthPickerModalVisible(true);
       //showPicker();
      }}
     >
      <FontAwesome5 name="calendar-alt" size={24} color="#3e50b4" />
     </TouchableOpacity>
     {/*<DetailHeaderTitle>1/5</DetailHeaderTitle>*/}
    </DetailHeader>
    <HorizontalTransDetail
     refreshFn={refreshFn}
     loading={loading}
     key={order.orderSeq}
     id={order.orderSeq}
     opratSctn={order.opratSctn}
     workArea={order.workArea}
     rcritType={code(codes, order.rcritType)}
     carTypes={order.carTypes
      .map((c) => {
       return code(codes, c) + " ";
      })
      .join(" ")}
     tonType={code(codes, order.tonType)}
     dlvyPrdlst={order.dlvyPrdlst}
     salary={order.salary}
     expensYn={code(codes, order.expensYn)}
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
     tmpKey={order.tmpKey}
    />
   </Detail>
   {order.tmpKey != 1 && order.tmpKey != 2 && order.tmpKey != 3 ? (
    <DetailFooter>
     <CancelBtn
      onPress={() => {
       Alert.alert(
        "오더 거절",
        "이 오더를 거절하시겠습니까?",
        [
         {
          text: "아니오",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
         },
         { text: "네", onPress: () => console.log("Confirm Pressed") },
        ],
        { cancelable: false }
       );
      }}
     >
      <Text style={{ fontSize: 16, color: "#3e50b4", fontWeight: "bold" }}>
       오더 거절
      </Text>
     </CancelBtn>
     <ConfirmBtn
      onPress={() => {
       Alert.alert(
        "오더 승인",
        "이 오더를 승인하시겠습니까?",
        [
         {
          text: "아니오",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
         },
         { text: "네", onPress: () => console.log("Confirm Pressed") },
        ],
        { cancelable: false }
       );
      }}
     >
      <ConfirmBtnText>오더 승인</ConfirmBtnText>
     </ConfirmBtn>
    </DetailFooter>
   ) : null}
  </OuterContainer>
 );
};
