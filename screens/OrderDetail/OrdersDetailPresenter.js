import React, { useState, useEffect } from "react";
import {
 Text,
 TouchableOpacity,
 Modal,
 View,
 StyleSheet,
 Alert,
 KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import HorizontalOrderDetail from "../../components/HorizontalOrderDetail";
import { code, trimText } from "../../utils";
import { useCodes } from "../../CodeContext";
import { useGetUserRegistInfo } from "../../UserRegistContext";
import DataQueryBox from "../../components/DataQueryBox";

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
 background-color: #3e50b4;
 height: 50px;
`;
const ConfirmBtnText = styled.Text`
 text-align: center;
 color: white;
 font-weight: bold;
 font-size: 24px;
`;

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
    <KeyboardAvoidingView
     behavior="padding"
     enabled
     style={styles.centeredView}
    >
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
