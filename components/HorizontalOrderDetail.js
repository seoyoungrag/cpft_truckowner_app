import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text, View, ScrollView } from "react-native";
import DataBodyRow from "./DataBodyRow";
import { FontAwesome5 } from "@expo/vector-icons";
import ScrollContainer from "./ScrollContainer";

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

const OpratSctn = styled.Text`
 text-align: center;
 padding-top: 10px;
 padding-bottom: 10px;
`;
const RcritType = styled.Text`
 flex: 1;
 text-align: right;
`;

const WorkingAreaHeader = styled.Text`
 text-align: center;
 font-size: 20px;
`;
const DataHeader = styled.View`
 flex: 0.3;
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
 flex: 0.7;
 flex-direction: column;
 width: 100%;
`;

const DataBottom = styled.View`
 flex: 1;
 flex-direction: row;
 justify-content: space-between;
 align-items: flex-end;
 margin-top: 5px;
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
 margin-bottom: 10px;
`;
const DataHeaderBottomTitle = styled.Text`
 text-align: center;
 color: white;
 font-size: ${titleFontSize - 2 * titleBorderWidth}px;
 line-height: ${titleFontSize -
 (Platform.OS === "ios" ? 2 * titleBorderWidth : titleBorderWidth)}px;
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
}) => {
 return (
  <Data>
   <DataHeader>
    <WorkingAreaHeader>
     {workingArea.split(" ").slice(0, 2).join(" ")}
    </WorkingAreaHeader>
    <OpratSctn>{opratSctn + " 배송"}</OpratSctn>
    <DataHeaderBottom>
     <DataHeaderBottomInner>
      <DataHeaderBottomTitleContainer>
       <DataHeaderBottomTitle>급여</DataHeaderBottomTitle>
      </DataHeaderBottomTitleContainer>
      <Text>{payAmt + " 이상"}</Text>
     </DataHeaderBottomInner>
     <DataHeaderBottomInner>
      <DataHeaderBottomTitleContainer style={{ backgroundColor: "white" }}>
       <DataHeaderBottomTitle style={{ color: "#3a99fc" }}>
        {rcritType}
       </DataHeaderBottomTitle>
      </DataHeaderBottomTitleContainer>
      <Text></Text>
     </DataHeaderBottomInner>
     <DataHeaderBottomInner>
      <DataHeaderBottomTitleContainer>
       <FontAwesome5 name="clock" size={titleFontSize * 2} color="white" />
      </DataHeaderBottomTitleContainer>
      <Text>
       {workHourStart}:{workMinuteStart}
       {" ~ "}
       {workHourEnd}:{workMinuteEnd}
      </Text>
     </DataHeaderBottomInner>
    </DataHeaderBottom>
   </DataHeader>
   <DataBody>
    <ScrollContainer refreshFn={refreshFn} loading={loading}>
     <DataBodyRow title="모집유형" content={rcritType} />
     <DataBodyRow title="톤수" content={tonType} />
     <DataBodyRow title="차종" content={carTypes} />
     <DataBodyRow title="품목" content={dlvyPrdlst} />
     <DataBodyRow title="상차지" content={workingArea} />
     <DataBodyRow title="급여" content={payAmt + " " + payFullType} />
     <DataBodyRow title="근무일자" content={workDays} />
     <DataBodyRow
      title="근무시간"
      content={
       workHourStart +
       ":" +
       workMinuteStart +
       " ~ " +
       workHourEnd +
       ":" +
       workMinuteEnd
      }
     />
     <DataBodyRow title="상세사항" content={detailMatter} />
     <DataBodyRow title="운송사" content="팀프레시" />
    </ScrollContainer>
   </DataBody>
  </Data>
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
