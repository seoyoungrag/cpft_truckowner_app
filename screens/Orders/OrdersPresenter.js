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
import HorizontalOrder from "../../components/HorizontalOrder";
import ScrollContainer from "../../components/ScrollContainer";
import List from "../../components/List";
import { code, trimText } from "../../utils";
import { useIsModal, useSetIsModalProp } from "../../ModalContext";
import OrderFilter from "./OrderFilter";
import { useCodes } from "../../CodeContext";
import {
 useUserRegistInfo,
 useGetUserRegistInfo,
 useSetUserRegistInfo,
} from "../../UserRegistContext";

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
 const fetchData = async () => {
  const data = await getUserRegistInfo();
  setUserRegistInfoProp(data);
 };

 const goToOrderDetail = (order) => {
  if (
   !(
    userRegistInfo.carNum &&
    userRegistInfo.corpNum &&
    userRegistInfo.corpNm &&
    userRegistInfo.corpRpresentNm &&
    userRegistInfo.corpCategory &&
    userRegistInfo.corpType &&
    userRegistInfo.userAddress
   )
  ) {
   setModalVisible(true);
  } else {
   navigation.navigate("OrderDetail", {
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
   });
  }
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
  <List title="오더" filter={<OrderFilter />}>
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
   <ScrollContainer
    refreshOn={true}
    refreshFn={refreshFn}
    loading={loading}
    contentContainerStyle={{
     backgroundColor: useIsModal() ? "rgba(0,0,0,0.5)" : "white",
    }}
   >
    {now.map((n) => (
     <HorizontalOrder
      key={n.orderSeq}
      id={n.orderSeq}
      opratSctn={n.opratSctn}
      workingArea={n.workingArea}
      rcritType={code(codes, n.rcritType)}
      carTypes={n.carTypes.map((c) => {
       return code(codes, c) + " ";
      })}
      tonType={code(codes, n.tonType)}
      dlvyPrdlst={n.dlvyPrdlst}
      payAmt={n.payAmt}
      payFullType={code(codes, n.payFullType)}
      goToOrderDetail={() => {
       goToOrderDetail(n);
      }}
     />
    ))}
    {now.map((n) => (
     <HorizontalOrder
      key={n.orderSeq}
      id={n.orderSeq}
      opratSctn={n.opratSctn}
      workingArea={n.workingArea}
      rcritType={code(codes, n.rcritType)}
      carTypes={n.carTypes.map((c) => {
       return code(codes, c) + " ";
      })}
      tonType={code(codes, n.tonType)}
      dlvyPrdlst={n.dlvyPrdlst}
      payAmt={n.payAmt}
      payFullType={code(codes, n.payFullType)}
      goToOrderDetail={() => {
       goToOrderDetail(n);
      }}
     />
    ))}
    {now.map((n) => (
     <HorizontalOrder
      key={n.orderSeq}
      id={n.orderSeq}
      opratSctn={n.opratSctn}
      workingArea={n.workingArea}
      rcritType={code(codes, n.rcritType)}
      carTypes={n.carTypes.map((c) => {
       return code(codes, c) + " ";
      })}
      tonType={code(codes, n.tonType)}
      dlvyPrdlst={n.dlvyPrdlst}
      payAmt={n.payAmt}
      payFullType={code(codes, n.payFullType)}
      goToOrderDetail={() => {
       goToOrderDetail(n);
      }}
     />
    ))}
    {now.map((n) => (
     <HorizontalOrder
      key={n.orderSeq}
      id={n.orderSeq}
      opratSctn={n.opratSctn}
      workingArea={n.workingArea}
      rcritType={code(codes, n.rcritType)}
      carTypes={n.carTypes.map((c) => {
       return code(codes, c) + " ";
      })}
      tonType={code(codes, n.tonType)}
      dlvyPrdlst={n.dlvyPrdlst}
      payAmt={n.payAmt}
      payFullType={code(codes, n.payFullType)}
      goToOrderDetail={() => {
       goToOrderDetail(n);
      }}
     />
    ))}
   </ScrollContainer>
  </List>
 );
};
