import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCodes } from "../CodeContext";
import { Entypo } from "@expo/vector-icons";
import { trimText, formatDate, code } from "../utils";
import { useIsModal, useSetIsModalProp } from "../ModalContext";

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
 flex: 1;
 text-align: left;
 font-size: 20px;
`;

const RcritType = styled.Text`
 padding-bottom: 5px;
`;

const TransProgress = styled.View`
 flex: 1;
 width: 100%;
 padding-horizontal: 15px;
 justify-content: space-between;
 flex-direction: row;
 font-size: 18px;
`;

const WorkingArea = styled.Text`
 flex: 1;
 text-align: left;
`;

const TonType = styled.Text`
 text-align: left;
`;
const CarType = styled.Text`
 text-align: left;
 padding-left: 5px;
`;
const DlvyPrdlst = styled.Text`
 flex: 1;
 text-align: left;
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
 flex: 1;
 flex-direction: row;
 justify-content: space-between;
 align-items: flex-start;
 margin-bottom: 5px;
`;

const DataBody = styled.View`
 flex: 1;
 flex-direction: column;
`;

const DataBottom = styled.View`
 flex: 1;
 flex-direction: row;
 justify-content: space-between;
 align-items: flex-end;
 margin-top: 5px;
`;

const CarInfo = styled.View`
 flex: 1;
 flex-direction: row;
`;
const PayInfo = styled.View`
 flex: 1;
 flex-direction: row;
`;

const DataBottomBtn = styled.TouchableOpacity`
 flex: 0.5;
 align-items: center;
 justify-content: center;
 background-color: #3e50b4;
 border-color: white;
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
 goToTransDetail,
 order,
 status,
}) => {
 const navigation = useNavigation();
 const goToDetail = () => {
  navigation.navigate("Detail", {
   isTv,
   id,
   title,
   poster,
   overview,
   releaseDate,
  });
 };
 const codes = useCodes();
 return (
  <Container>
   <Data>
    <DataHeader>
     <OpratSctn>{opratSctn}</OpratSctn>
     {status === "채용확정" ? (
      <Text style={{ fontSize: 20, color: "grey" }}>최종합격</Text>
     ) : (
      <DataBottomBtn
       onPress={() => {
        Alert.alert(
         "지원취소",
         "지원을 취소 하시겠습니까?",
         [
          {
           text: "아니오",
           onPress: () => console.log("Cancel Pressed"),
           style: "cancel",
          },
          { text: "네", onPress: () => console.log("confirm Pressed") },
         ],
         { cancelable: false }
        );
       }}
      >
       <Text style={{ fontSize: 20, color: "white" }}>지원취소</Text>
      </DataBottomBtn>
     )}
    </DataHeader>
    <DataBody>
     <WorkingArea>
      {workingArea?.split(" ").slice(0, 2).join(" ")} 배송
     </WorkingArea>
     <RcritType>
      {rcritType} / {code(codes, order.tonType)} / {payAmt} {payFullType}
     </RcritType>
     <RcritType>{dlvyPrdlst}</RcritType>
    </DataBody>
   </Data>
  </Container>
 );
};

Horizontal.propTypes = {
 id: PropTypes.number.isRequired,
 opratSctn: PropTypes.string.isRequired,
 workingArea: PropTypes.string.isRequired,
 rcritType: PropTypes.string.isRequired,
 carTypes: PropTypes.array.isRequired,
 tonType: PropTypes.string.isRequired,
 dlvyPrdlst: PropTypes.string.isRequired,
 payAmt: PropTypes.string.isRequired,
 payFullType: PropTypes.string.isRequired,
};
export default Horizontal;
