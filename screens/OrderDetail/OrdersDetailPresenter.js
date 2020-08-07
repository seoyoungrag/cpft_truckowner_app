import React, { useState, useEffect } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import HorizontalOrder from "../../components/HorizontalOrder";
import ScrollContainer from "../../components/ScrollContainer";
import styled from "styled-components/native";
import { code, trimText } from "../../utils";
import { useCodes } from "../../CodeContext";
import {
 useUserRegistInfo,
 useGetUserRegistInfo,
 useSetUserRegistInfo,
} from "../../UserRegistContext";

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
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
  width: screenWidth,
  height: screenHeight,
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

export default ({ refreshFn, loading, order }) => {
 //console.log(props);
 //console.log(order);
 const navigation = useNavigation();
 const codes = useCodes();
 const getUserRegistInfo = useGetUserRegistInfo();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const [modalVisible, setModalVisible] = useState(false);
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
    visible={modalVisible}
   >
    <View style={styles.centeredView}>
     <View style={styles.modalView}>
      <Text style={styles.modalTItle}>보기 권한</Text>

      <Text style={styles.modalBody}>
       차량정보 입력한 회원만 볼 수 있습니다. {"\r\n"}마저 등록하러
       가시겠습니까?
      </Text>
      <TouchableOpacity
       style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
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
    <ScrollContainer
     refreshFn={refreshFn}
     loading={loading}
     contentContainerStyle={{ paddingBottom: 80 }}
    >
     <HorizontalOrder
      key={order.orderSeq}
      id={order.orderSeq}
      opratSctn={order.opratSctn}
      workingArea={order.workingArea}
      rcritType={code(codes, order.rcritType)}
      carTypes={order.carTypes.map((c) => {
       return code(codes, c) + " ";
      })}
      tonType={code(codes, order.tonType)}
      dlvyPrdlst={order.dlvyPrdlst}
      payAmt={order.payAmt}
      payFullType={code(codes, order.payFullType)}
      goToOrderDetail={() => {
       console.log(this);
      }}
     />
    </ScrollContainer>

    <DetailFooter>
     <CancelBtn
      onPress={() => {
       console.log(this);
      }}
     >
      <Text style={{ fontSize: 24 }}>문의</Text>
     </CancelBtn>
     <ConfirmBtn
      onPress={() => {
       console.log(this);
      }}
     >
      <ConfirmBtnText>다음</ConfirmBtnText>
     </ConfirmBtn>
    </DetailFooter>
   </Detail>
  </OuterContainer>
 );
};
