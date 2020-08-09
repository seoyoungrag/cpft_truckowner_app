import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { trimText, formatDate, code } from "../utils";
import { useIsModal, useSetIsModalProp } from "../ModalContext";
import { FontAwesome5 } from '@expo/vector-icons';

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
 border-top-width: 0px;
 padding: 10px;
`;

const Title = styled.Text`
 color: white;
 font-weight: bold;
 margin-bottom: 10px;
`;

const ReleaseDate = styled.Text`
 color: white;
 font-size: 12px;
 margin-bottom: 10px;
`;

const Overview = styled.Text`
 margin-top: 10px;
 color: white;
`;
const OpratSctn = styled.Text`
 flex: 1;
 text-align: center;
 padding-top: 10px;
 padding-bottom: 10px;
`;
const RcritType = styled.Text`
 flex: 1;
 text-align: right;
`;

const WorkingAreaHeader = styled.Text`
 flex: 1;
 text-align: center;
 font-size: 20px;
`;
const WorkingArea = styled.Text`
 flex: 1;
 text-align: right;
 font-size: 20px;
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
 width: 100%;
 flex-direction: column;
 align-items: center;
 margin-bottom: 5px;
 border-bottom-width: 1px;
`;
const DataHeaderBottom = styled.View`
 flex: 1;
 justify-content: space-between;
 flex-direction: row;
 align-items: center;
 margin-bottom: 5px;
`;

const DataHeaderBottomInner = styled.View`
 flex: 1;
 flex-direction: column;
 align-items: center;
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
const titleFontSize = '16';
const titleBorderWidth = '1';
const DataHeaderBottomTitleContainer = styled.View`
    align-items: center;
    justify-content: center;
 background-color:#3a99fc;
 border-color:#3a99fc;
 width: ${titleFontSize*3}px;
 height: ${titleFontSize*3}px;
 border-radius:${titleFontSize*3}px;
 border-width: ${titleBorderWidth}px;
 margin-bottom: 10px;
`;
const DataHeaderBottomTitle = styled.Text`
 text-align: center;
 color: white;
font-size: ${titleFontSize -2 * titleBorderWidth}px;
line-height: ${titleFontSize - (Platform.OS ==='ios'? 2* titleBorderWidth : titleBorderWidth)}px;
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
      <WorkingAreaHeader>{workingArea.split(" ").slice(0,2).join(' ')}</WorkingAreaHeader>
      <OpratSctn>{opratSctn+" 배송"}</OpratSctn>
      <DataHeaderBottom>
        <DataHeaderBottomInner><DataHeaderBottomTitleContainer><DataHeaderBottomTitle>급여</DataHeaderBottomTitle></DataHeaderBottomTitleContainer><Text>{payAmt+" 이상"}</Text></DataHeaderBottomInner>
        <DataHeaderBottomInner><DataHeaderBottomTitleContainer style={{backgroundColor: "white"}}><DataHeaderBottomTitle style={{color:"#3a99fc"}}>{rcritType}</DataHeaderBottomTitle></DataHeaderBottomTitleContainer><RcritType></RcritType></DataHeaderBottomInner>
        <DataHeaderBottomInner><DataHeaderBottomTitleContainer><FontAwesome5 name="clock" size={titleFontSize*2} color="white" /></DataHeaderBottomTitleContainer><Text>{workHourStart}:
 {workMinuteStart}{" ~ "}
 {workHourEnd}:
 {workMinuteEnd}</Text></DataHeaderBottomInner>
      </DataHeaderBottom>
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
 id: PropTypes.string.isRequired,
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
