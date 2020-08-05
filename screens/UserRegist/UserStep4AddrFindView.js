import React, { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import Postcode from "react-native-daum-postcode";
import { View } from "react-native-animatable";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const OuterContainer = styled.SafeAreaView`
 flex: 1;
`;

const Modal = styled.View`
 flex: 1;
 flex-direction: column;
 background-color: white;
`;

const ModalHeader = styled.View`
 height: 40px;
 padding-left: 20px;
 padding-right: 20px;
 padding-top: 20px;
 align-items: center;
 flex-direction: row;
 justify-content: space-between;
`;
const ModalHeaderTitle = styled.Text`
 color: black;
 font-size: 20px;
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
 font-weight: 500;
 font-size: 16px;
 margin-left: 40px;
 margin-right: 40px;
`;

export default ({ navigation, route }) => {
 const goBack = async () => {
  await navigation.pop();
 };
 const confrimBtnClicked = async (addrData) => {
  await route?.params?.setAddress(addrData);
  await navigation.pop();
 };

 return (
  <OuterContainer>
   <Modal>
    <ModalHeader>
     <TouchableOpacity
      style={{
       width: 40,
       height: 40,
       justifyContent: "center",
      }}
      onPress={goBack}
     >
      <AntDesign name={"leftcircle"} color={"black"} size={24} />
     </TouchableOpacity>
     <ModalHeaderTitle>주소찾기</ModalHeaderTitle>
    </ModalHeader>
    <View style={{ backgroundColor: "transparent" }}>
     <Data style={{ width: screenWidth, height: screenHeight - 65 }}>
      <Container style={{ flex: 1, justifyContent: "flex-start" }}>
       <Postcode
        style={{
         width: screenWidth,
         height: screenHeight,
         backgroundColor: "transparent",
        }}
        jsOptions={{ animated: true }}
        onSelected={confrimBtnClicked}
       />
      </Container>
     </Data>
    </View>
   </Modal>
  </OuterContainer>
 );
};
