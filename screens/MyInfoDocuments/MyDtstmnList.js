import React from "react";
import styled from "styled-components";
import ScrollContainer from "../../components/ScrollContainer";
import MyDocumentListRow from "../../components/MyDocumentListRow";
import { useNavigation } from "@react-navigation/native";

const View = styled.View`
 justify-content: center;
 align-items: center;
 flex: 1;
`;

const Text = styled.Text``;

const DataBottomBtn = styled.TouchableOpacity`
 flex: 1;
 align-items: center;
 justify-content: center;
 background-color: #3e50b4;
 border-color: white;
`;

export default () => {
 const navigation = useNavigation();
 return (
  <ScrollContainer
   loading={false}
   contentContainerStyle={{ paddingTop: 20, backgroundColor: "white" }}
  >
   <MyDocumentListRow
    title="2020년 7월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("DtStmn");
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>명세서 보기</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 6월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("DtStmn");
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>명세서 보기</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 5월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("DtStmn");
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>명세서 보기</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 4월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("DtStmn");
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>명세서 보기</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 3월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("DtStmn");
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>명세서 보기</Text>
     </DataBottomBtn>
    }
   />
   <MyDocumentListRow
    title="2020년 2월 고정"
    content={
     <DataBottomBtn
      onPress={() => {
       navigation.navigate("DtStmn");
      }}
     >
      <Text style={{ fontSize: 24, color: "white" }}>명세서 보기</Text>
     </DataBottomBtn>
    }
   />
  </ScrollContainer>
 );
};
