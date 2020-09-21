import React, { useState, useEffect, useRef } from "react";
import {
 Dimensions,
 Text,
 TouchableOpacity,
 Modal,
 View,
 StyleSheet,
 KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import HorizontalMyOrders from "../../components/HorizontalMyOrders";
import ScrollContainer from "../../components/ScrollContainer";
import { code } from "../../utils";
import { useIsModal } from "../../ModalContext";
import { useCodes } from "../../CodeContext";
import { useGetUserRegistInfo } from "../../UserRegistContext";
import styled from "styled-components/native";
import Title from "../../components/Title";

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
  margin: 30,
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
  marginLeft: 5,
  textAlign: "center",
 },
 modalBody: {
  marginBottom: 15,
  textAlign: "center",
 },
});

const Container = styled.View`
 flex: 1;
 margin-top: 10px;
 padding-top: 35px;
 margin-bottom: 45px;
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
 flex-direction: row;

 justify-content: flex-start;
 align-items: center;
 padding-top: 10px;
 padding-left: 15px;
`;
const DataBody = styled.View`
 padding-left: 15px;
 padding-right: 10px;
 padding-bottom: 10px;
 flex-direction: column;
 justify-content: flex-start;
 align-items: flex-start;
`;

const TransProgress = styled.View`
 width: 100%;
 padding-horizontal: 15px;
 justify-content: space-between;
 flex-direction: row;
 font-size: 18px;
`;

const UserPRComment = styled.Text`
 font-size: 24px;
 text-decoration-line: underline;
`;

export default ({ refreshFn, loading, truckOwnerOrders }) => {
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
   <View style={{ flex: 1, backgroundColor: "white" }}>
    <Title title="MY" />
    <TouchableOpacity
     onPress={() => {
      navigation.navigate("MyInfoEdit");
     }}
    >
     <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={{ flex: 0, borderWidth: 1, margin: 5 }}
     >
      <DataHeader>
       <DataHeaderBottomTitleContainer>
        <DataHeaderBottomTitle>{userRegistInfo?.userNm}</DataHeaderBottomTitle>
       </DataHeaderBottomTitleContainer>
       <Text style={styles.modalTItle}>{userRegistInfo?.userNm} 님</Text>
      </DataHeader>
      <DataBody>
       <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
         <UserPRComment>안전 정확 배송 합니다.</UserPRComment>
        </View>
       </View>
      </DataBody>
     </KeyboardAvoidingView>
    </TouchableOpacity>
    <TransProgress>
     <TouchableOpacity
      onPress={() => {
       navigation.navigate("Trans");
      }}
     >
      <Text
       style={{
        borderRadius: 7,
        padding: 5,
        textAlignVertical: "center",
        backgroundColor: "#3e50b4",
        color: "white",
       }}
      >
       <Entypo name="text-document" size={18} color="white" /> 운송내역
      </Text>
     </TouchableOpacity>
     <TouchableOpacity
      onPress={() => {
       navigation.navigate("MyInfoDocuments", {
        screen: "MyInfoEditTabs",
        params: { screen: "MyDtstmnList" },
       });
      }}
     >
      <Text
       style={{
        borderRadius: 7,
        padding: 5,
        textAlignVertical: "center",
        backgroundColor: "#3e50b4",
        color: "white",
       }}
      >
       <Entypo name="text-document" size={18} color="white" /> 명세서
      </Text>
     </TouchableOpacity>
     <TouchableOpacity
      onPress={() => {
       navigation.navigate("MyInfoDocuments", {
        screen: "MyInfoEditTabs",
        params: { screen: "MyTaxInvoiceList" },
       });
      }}
     >
      <Text
       style={{
        borderRadius: 7,
        padding: 5,
        textAlignVertical: "center",
        backgroundColor: "#3e50b4",
        color: "white",
       }}
      >
       <Entypo name="text-document" size={18} color="white" /> 세금계산서
      </Text>
     </TouchableOpacity>
    </TransProgress>
    <Container style={{ paddingTop: 0 }}>
     <View
      style={{
       backgroundColor: "rgba(0,0,0,0.4)",
       position: "absolute",
       top: 0,
       left: 0,
       width: "100%",
       height: "100%",
       zIndex: 9999999,
       justifyContent: "center",
      }}
     >
      <View style={styles.modalView}>
       <Text style={styles.modalTItle}>"내가 지원한 오더" 개발중</Text>

       <Text style={styles.modalBody}>
        이 기능은 이번 테스트에 포함되지 않았습니다.
       </Text>
      </View>
     </View>
     <ScrollContainer
      refreshOn={true}
      refreshFn={refreshFn}
      loading={loading}
      contentContainerStyle={{
       backgroundColor: useIsModal() ? "rgba(0,0,0,0.5)" : "white",
       paddingTop: 10,
      }}
     >
      <Title title="내가 지원한 오더" />
      {truckOwnerOrders.map((n) => (
       <HorizontalMyOrders
        key={n.order.orderSeq}
        id={n.order.orderSeq}
        opratSctn={n.order.opratSctn}
        workingArea={n.order.workingArea}
        rcritType={code(codes, n.order.rcritType)}
        carTypes={n.order.carTypes?.map((c) => {
         return code(codes, c) + " ";
        })}
        tonType={code(codes, n.order.tonType)}
        dlvyPrdlst={n.order.dlvyPrdlst}
        payAmt={n.order.payAmt}
        payFullType={code(codes, n.order.payFullType)}
        order={n.order}
        status={code(codes, n.status)}
        goToTransDetail={() => {
         goToTransDetail(n);
        }}
       />
      ))}
     </ScrollContainer>
    </Container>
   </View>
  </>
 );
};
