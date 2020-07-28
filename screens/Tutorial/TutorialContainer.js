import React, { Component, useState } from "react";
import {
 SafeAreaView,
 Dimensions,
 StyleSheet,
 ScrollView,
 View,
 AsyncStorage,
} from "react-native";

import TutorialPresenter from "./TutorialPresenter";
import styled from "styled-components/native";
import ScrollContainer from "../../components/ScrollContainer";
import { useTutorialPass } from "../../TutorialContext";
// import {FlatListSlider} from 'react-native-flatlist-slider';

const ModalFooter = styled.View`
 position: absolute;
 bottom: 0px;
 left: 0px;
 right: 0px;
 height: 50px;
 align-items: flex-end;
`;

const ConfirmBtn = styled.TouchableOpacity`
 width: 100%;
 height: 100%;
 justify-content: center;
 background-color: #3a99fc;
`;
const ConfirmBtnText = styled.Text`
 text-align: center;
 color: white;
 font-weight: bold;
 font-size: 24px;
`;

const OuterContainer = styled.SafeAreaView`
 flex: 1;
`;

export default () => {
 const [data, setData] = useState([
  {
   image:
    "https://images.unsplash.com/photo-1533839346998-ba7ebed7e89d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
   desc: "일자리 구하셈.",
  },
  {
   image:
    "https://images.unsplash.com/photo-1503164592308-0b42e96735c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
   desc: "정산하셈.",
  },
  {
   image:
    "https://images.unsplash.com/photo-1564567913547-428a0fc38750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
   desc: "일자리 또 구하셈.",
  },
 ]);
 const tutorialPass = useTutorialPass();
 const onClickStart = () => {
  console.log(tutorialPass);
  tutorialPass();
 };
 const screenWidth = Math.round(Dimensions.get("window").width);
 const screenHeight = Math.round(Dimensions.get("window").height);
 return (
  <OuterContainer>
   <ScrollContainer
    loading={false}
    contentContainerStyle={{
     paddingBottom: 80,
     backgroundColor: "transparent",
     marginTop: 20,
     paddingTop: 20,
    }}
    refreshOn={false}
   >
    <TutorialPresenter
     data={data}
     imageKey={"image"}
     local={false}
     width={screenWidth}
     height={screenHeight - 250}
     separator={0}
     timer={3000}
     loop={true}
     autoscroll={true}
     //currentIndexCallback={(index) => console.log("Index", index)}
     //onPress={onClickStart}
     indicator
     animation
    />
   </ScrollContainer>

   <ModalFooter>
    <ConfirmBtn onPress={onClickStart}>
     <ConfirmBtnText>시작하기</ConfirmBtnText>
    </ConfirmBtn>
   </ModalFooter>
  </OuterContainer>
 );
};

const styles = StyleSheet.create({
 separator: {
  height: 20,
 },
 contentStyle: {
  paddingHorizontal: 16,
 },
});
