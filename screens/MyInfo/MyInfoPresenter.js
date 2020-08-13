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
import HorizontalMyOrders from "../../components/HorizontalMyOrders";
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

const Container = styled.View`
 flex: 1;
 margin-top: 10px;
 padding-top: 35px;
 margin-bottom: 45px;
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
    <Container style={{ paddingTop: 0 }}>
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
