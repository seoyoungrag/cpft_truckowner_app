import React, { useState, useEffect } from "react";
import {
 Dimensions,
 Text,
 TouchableOpacity,
 Modal,
 View,
 StyleSheet,
 TextInput,
 Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import HorizontalOrderDetail from "../../components/HorizontalOrderDetail";
import ScrollContainer from "../../components/ScrollContainer";
import { code, trimText } from "../../utils";
import { useCodes } from "../../CodeContext";
import DataBodyRow from "../../components/DataBodyRow";
import {
 useUserRegistInfo,
 useGetUserRegistInfo,
 useSetUserRegistInfo,
} from "../../UserRegistContext";
import DataQueryBox from "../../components/DataQueryBox";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

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
const DetailHeaderTitle = styled.Text`
 color: black;
 font-size: 20px;
`;

const DetailFooter = styled.View`
 flex-direction: row;
 justify-content: space-around;
`;

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
const CancelBtnText = styled.Text`
 text-align: center;
 color: white;
 font-weight: bold;
 font-size: 24px;
`;
const ConfirmBtnText = styled.Text`
 text-align: center;
 color: white;
 font-weight: bold;
 font-size: 24px;
`;

const Data = styled.View`
 margin-top: 0px;
 padding: 0px 0px;
`;
const Container = styled.View`
 flex: 1;
 flex-direction: column;
 align-items: flex-start;
`;

const DataName = styled.Text`
 margin-top: 30px;
 color: black;
 opacity: 0.8;
 font-weight: bold;
 font-size: 32px;
 margin-left: 40px;
`;

const DataValue = styled.Text`
 margin-left: 40px;
 margin-right: 40px;
 color: black;
 opacity: 0.8;
 font-weight: 500;
 font-size: 16px;
`;

const DataValueBtn = styled.TouchableOpacity`
 width: ${(screenWidth * 3) / 4}px;
 border-width: 1px;
 border-radius: 10px;
 border-color: silver;
 padding: 10px;
 margin-top: 10px;
 margin-left: 40px;
 margin-right: 40px;
 color: black;
 opacity: 0.8;
 font-weight: 500;
 font-size: 16px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const DataValueBtnSec = styled.TouchableOpacity`
 width: ${(screenWidth * 3) / 4}px;
 border-width: 1px;
 border-radius: 10px;
 border-color: silver;
 padding: 10px;
 margin-top: 10px;
 margin-left: 40px;
 margin-right: 40px;
 color: black;
 opacity: 0.8;
 font-weight: 500;
 font-size: 16px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const DataValueRed = styled.Text`
 width: 200px;
 margin-left: 40px;
 margin-right: 40px;
 color: red;
 opacity: 0.8;
 font-weight: 500;
 border-radius: 10px;
`;
const styles = StyleSheet.create({
 centeredView: {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: 22,
  width: screenWidth,
  height: screenHeight,
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
 background-color: #3a99fc;
 border-color: #3a99fc;
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

export default ({ refreshFn, loading, order }) => {
 //console.log(props);
 //console.log('orderDetail', order);
 const navigation = useNavigation();
 const codes = useCodes();
 const getUserRegistInfo = useGetUserRegistInfo();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const [applyModalVisible, setApplyModalVisible] = useState(false);
 const [queryModalVisible, setQueryModalVisible] = useState(false);
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
 return (
  <OuterContainer>
   <Modal
    animationType="fade"
    hardwareAccelerated={true}
    transparent={true}
    statusBarTranslucent={true}
    visible={queryModalVisible}
   >
    <View style={styles.centeredView}>
     <View style={styles.modalView}>
      <View style={styles.modalInnerView}>
       <DataHeader>
        <DataQueryBox
         title="배송지는 어떻게 되나요?"
         date="20.08.07"
         reply="RE: 운송사의 답변은 어쩌고저쩌고"
        />
       </DataHeader>
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
      <CancelBtn
       onPress={() => {
        setQueryModalVisible(!queryModalVisible);
       }}
      >
       <Text style={{ fontSize: 24 }}>취소</Text>
      </CancelBtn>
      <ConfirmBtn
       style={{
        ...styles.openButton,
        backgroundColor: "#2196F3",
       }}
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
     </View>
    </View>
   </Modal>
   <Modal
    animationType="fade"
    hardwareAccelerated={true}
    transparent={true}
    statusBarTranslucent={true}
    visible={applyModalVisible}
   >
    <View style={styles.centeredView}>
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
       style={{
        ...styles.openButton,
        backgroundColor: "#2196F3",
       }}
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
     {/*<DetailHeaderTitle>1/5</DetailHeaderTitle>*/}
    </DetailHeader>
    <HorizontalOrderDetail
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
    <DetailFooter>
     <CancelBtn
      onPress={() => {
       setQueryModalVisible(true);
      }}
     >
      <Text style={{ fontSize: 24 }}>문의</Text>
     </CancelBtn>
     <ConfirmBtn
      onPress={() => {
       setApplyModalVisible(true);
      }}
     >
      <ConfirmBtnText>지원하기</ConfirmBtnText>
     </ConfirmBtn>
    </DetailFooter>
   </Detail>
  </OuterContainer>
 );
};
