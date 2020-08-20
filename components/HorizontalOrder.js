import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Poster from "./Poster";
import Votes from "./Votes";
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
 width: 100%;
 align-items: flex-start;
 border-top-width: 1px;
 padding: 10px;
`;

const OpratSctn = styled.Text`
 flex: 1;
 text-align: left;
 font-size: 20px;
`;
const RcritType = styled.Text`
 flex: 1;
 text-align: right;
`;

const WorkingArea = styled.Text`
 flex: 1;
 text-align: right;
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
 goToOrderDetail,
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
 return (
  <TouchableOpacity
   disabled={useIsModal()}
   style={{ width: "100%" }}
   onPress={goToOrderDetail}
  >
   <Container>
    <Data>
     <DataHeader>
      <OpratSctn>{opratSctn}</OpratSctn>
      <RcritType>{rcritType}</RcritType>
     </DataHeader>
     <DataBody>
      <WorkingArea>{workingArea}</WorkingArea>
      <CarInfo>
       <TonType>{tonType}</TonType>
       <CarType>{carTypes}</CarType>
      </CarInfo>
     </DataBody>
     <DataBottom>
      <DlvyPrdlst>{dlvyPrdlst}</DlvyPrdlst>
      <PayInfo>
       <PayAmt>{payAmt}</PayAmt>
       <PayFullType>{payFullType}</PayFullType>
      </PayInfo>
     </DataBottom>
    </Data>
   </Container>
  </TouchableOpacity>
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
