import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useCodes } from "../CodeContext";
import { code, trimText } from "../utils";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
 flex: 1;
 /*padding: 0px 30px;*/
 margin-bottom: 15px;
 align-items: flex-start;
`;

const Data = styled.View`
 flex: 1;
 align-items: flex-start;
 border-width: 1px;
 padding: 10px;
 margin: 5px;
`;

const CarrierNm = styled.Text`
 flex: 1;
 text-align: left;
 font-size: 20px;
`;
const OpratSctn = styled.Text`
 padding-vertical: 5px;
 flex: 1;
 text-align: left;
 font-size: 20px;
`;

const RcritType = styled.Text`
 padding-vertical: 5px;
 font-size: 18px;
`;

const TransProgress = styled.View`
 width: 100%;
 padding-horizontal: 15px;
 justify-content: space-between;
 flex-direction: row;
 font-size: 18px;
`;

const WorkingArea = styled.Text`
 text-align: left;
 font-size: 18px;
`;

const PayAmt = styled.Text`
 flex: 1;
 text-align: right;
 font-size: 20px;
`;
const PayFullType = styled.Text`
 padding-left: 5px;
 font-size: 20px;
`;

const DataHeader = styled.View`
 flex-direction: row;
 justify-content: space-between;
 align-items: flex-start;
 margin-bottom: 5px;
`;

const DataBody = styled.View`
 flex-direction: row;
 justify-content: space-between;
`;

const DataBottom = styled.View`
 flex: 1;
 flex-direction: row;
 justify-content: space-between;
 align-items: flex-end;
 margin-top: 5px;
`;

const PayInfo = styled.View`
 flex: 1;
 flex-direction: row;
`;

const DataBottomBtn = styled.TouchableOpacity`
 flex: 1;
 align-items: center;
 justify-content: center;
 background-color: #3e50b4;
 border-color: white;
 height: 50px;
`;

const Horizontal = ({
 id,
 opratSctn,
 rcritType,
 workingArea,
 carTypes,
 tonType,
 dlvyPrdlst,
 payAmt,
 payFullType,
 workHourStart,
 workMinuteStart,
 workHourEnd,
 workMinuteEnd,
 detailMatter,
 workDays,
 refreshFn,
 loading,
 order,
 tmpKey,
}) => {
 const codes = useCodes();
 const navigation = useNavigation();
 return (
  <Container>
   <Data>
    <Text style={{ alignSelf: "flex-end", paddingVertical: 5 }}>
     2020.03.05 ~ 근무중
    </Text>
    <DataHeader>
     <OpratSctn>{opratSctn}</OpratSctn>
     <PayInfo>
      <PayAmt>{payAmt}</PayAmt>
      <PayFullType>{payFullType}</PayFullType>
     </PayInfo>
    </DataHeader>
    <DataBody>
     <View flex={1}>
      <WorkingArea>
       {workingArea.split(" ").slice(0, 2).join(" ")} 배송
      </WorkingArea>
      <RcritType>
       {rcritType} / {code(codes, order.tonType)} / {payAmt} {payFullType}
      </RcritType>
      <RcritType>{dlvyPrdlst}</RcritType>
      <RcritType>
       {order?.workDays &&
        order.workDays
         .map((c) => {
          return code(codes, c) + " ";
         })
         .join(",")}
      </RcritType>
      <RcritType>
       {(order.workHourStart + "").padStart(2, "0")}:
       {(order.workMinuteStart + "").padStart(2, "0")} ~{" "}
       {(order.workHourEnd + "").padStart(2, "0")}:
       {(order.workMinuteEnd + "").padStart(2, "0")}
      </RcritType>
     </View>
     <View flex={1} style={{ paddingLeft: 10 }}>
      <RcritType>{detailMatter}</RcritType>
      <RcritType>- 타코미터 필수</RcritType>
      <RcritType>- 구로구 최대 46집</RcritType>
      <RcritType>운송사: 팀프레시</RcritType>
      {/*
      <DataBottomBtn onPress={() => {}}>
       <Text style={{ fontSize: 24, color: "white" }}>계약서</Text>
      </DataBottomBtn>
      */}
     </View>
    </DataBody>
    {tmpKey == 3 ? (
     <DataBottom>
      <DataBottomBtn
       onPress={() => {
        navigation.navigate("DtStmn", {
         tmpKey,
        });
       }}
      >
       <Text style={{ fontSize: 24, color: "white" }}>명세서</Text>
      </DataBottomBtn>
      <DataBottomBtn
       onPress={() => {
        navigation.navigate("TaxInvoice", {
         mgtKey: "7a7a2bg97o2w8oei93j5d18n",
         tmpKey,
        });
       }}
      >
       <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
      </DataBottomBtn>
     </DataBottom>
    ) : tmpKey == 1 ? (
     <DataBottom>
      <DataBottomBtn
       onPress={() => {
        navigation.navigate("DtStmn", {
         tmpKey,
        });
       }}
      >
       <Text style={{ fontSize: 24, color: "white" }}>명세서</Text>
      </DataBottomBtn>
      <DataBottomBtn
       activeOpacity={1}
       style={{ backgroundColor: "silver" }}
       onPress={() => {}}
      >
       <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
      </DataBottomBtn>
     </DataBottom>
    ) : tmpKey == 2 ? (
     <DataBottom>
      <DataBottomBtn
       activeOpacity={1}
       style={{ backgroundColor: "silver" }}
       onPress={() => {}}
      >
       <Text style={{ fontSize: 24, color: "white" }}>명세서</Text>
      </DataBottomBtn>
      <DataBottomBtn
       activeOpacity={1}
       style={{ backgroundColor: "silver" }}
       onPress={() => {}}
      >
       <Text style={{ fontSize: 24, color: "white" }}>세금계산서</Text>
      </DataBottomBtn>
     </DataBottom>
    ) : null}
   </Data>
   {tmpKey == 3 ? (
    <TransProgress>
     <Text style={{ textAlignVertical: "center" }}>
      명세서{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="#3e50b4" />{" "}
     </Text>
     <Text>
      <Entypo name="dot-single" size={18} color="#3e50b4" />{" "}
      <Entypo name="dot-single" size={18} color="#3e50b4" />{" "}
      <Entypo name="dot-single" size={18} color="#3e50b4" />{" "}
     </Text>
     <Text style={{ textAlignVertical: "center" }}>
      세금계산서{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="#3e50b4" />{" "}
     </Text>
     <Text>
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
     </Text>
     <Text style={{ textAlignVertical: "center" }}>
      입금대기{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
     </Text>
    </TransProgress>
   ) : tmpKey == 2 ? (
    <TransProgress>
     <Text style={{ textAlignVertical: "center" }}>
      명세서 <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
     </Text>
     <Text>
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
     </Text>
     <Text style={{ textAlignVertical: "center" }}>
      세금계산서{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
     </Text>
     <Text>
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
     </Text>
     <Text style={{ textAlignVertical: "center" }}>
      입금대기{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
     </Text>
    </TransProgress>
   ) : tmpKey == 1 ? (
    <TransProgress>
     <Text style={{ textAlignVertical: "center" }}>
      명세서{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="#3e50b4" />{" "}
     </Text>
     <Text>
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
     </Text>
     <Text style={{ textAlignVertical: "center" }}>
      세금계산서{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
     </Text>
     <Text>
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
      <Entypo name="dot-single" size={18} color="black" />{" "}
     </Text>
     <Text style={{ textAlignVertical: "center" }}>
      입금대기{" "}
      <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
     </Text>
    </TransProgress>
   ) : (
    <TransProgress></TransProgress>
   )}
   {/**
   <TransProgress>
    <Text style={{ textAlignVertical: "center" }}>
     명세서 <Entypo name="chevron-with-circle-down" size={18} color="#3e50b4" />{" "}
    </Text>
    <Text>
     <Entypo name="dot-single" size={18} color="#3e50b4" />{" "}
     <Entypo name="dot-single" size={18} color="#3e50b4" />{" "}
     <Entypo name="dot-single" size={18} color="#3e50b4" />{" "}
    </Text>
    <Text style={{ textAlignVertical: "center" }}>
     세금계산서{" "}
     <Entypo name="chevron-with-circle-down" size={18} color="#3e50b4" />{" "}
    </Text>
    <Text>
     <Entypo name="dot-single" size={18} color="black" />{" "}
     <Entypo name="dot-single" size={18} color="black" />{" "}
     <Entypo name="dot-single" size={18} color="black" />{" "}
    </Text>
    <Text style={{ textAlignVertical: "center" }}>
     입금대기 <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
    </Text>
   </TransProgress> */}
  </Container>
 );
};

Horizontal.propTypes = {
 id: PropTypes.number.isRequired,
 opratSctn: PropTypes.string.isRequired,
 workingArea: PropTypes.string.isRequired,
 rcritType: PropTypes.string.isRequired,
 carTypes: PropTypes.string.isRequired,
 tonType: PropTypes.string.isRequired,
 dlvyPrdlst: PropTypes.string.isRequired,
 payAmt: PropTypes.string.isRequired,
 payFullType: PropTypes.string.isRequired,
 detailMatter: PropTypes.string,
 workDays: PropTypes.string,
};
export default Horizontal;
