import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import TutorialPresenter from "./TutorialPresenter";
import ScrollContainer from "../../components/ScrollContainer";
import { useTutorialPass } from "../../TutorialContext";
import snapshot1 from "../../assets/snapshot1.jpg"; 
import snapshot2 from "../../assets/snapshot2.jpg"; 
import snapshot3 from "../../assets/snapshot3.jpg"; 
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
   image:snapshot1,
   desc: "일자리를 구하세요.",
  },
  {
   image:snapshot2,
   desc: "정산을 간편하게.",
  },
  {
   image:snapshot3,
   desc: "간편하게 일찾기.",
  },
 ]);
 const tutorialPass = useTutorialPass();
 const onClickStart = () => {
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
     local={true}
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
