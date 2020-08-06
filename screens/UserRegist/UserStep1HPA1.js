import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import ScrollContainer from "../../components/ScrollContainer";

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
 padding-left: 20px;
 padding-right: 20px;
 margin-top: ${Constants.statusBarHeight}px;
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

export default ({ navigation }) => {
 const goBack = () => {
  navigation.pop();
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
     <ModalHeaderTitle>본인확인 서비스 이용약관</ModalHeaderTitle>
    </ModalHeader>
    <ScrollContainer
     loading={false}
     contentContainerStyle={{
      paddingBottom: 80,
      backgroundColor: "transparent",
      marginTop: 0,
      paddingTop: 0,
     }}
     refreshOn={false}
    >
     <Data style={{ width: screenWidth, height: screenHeight - 100 }}>
      <Container
       style={{ flex: 1, justifyContent: "flex-start", marginTop: 0 }}
      >
       <DataName>
        이 편지는 영국에서 최초로 시작되어 일년에 한 바퀴 돌면서 받는 사람에게
        행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을
        떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내
        주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만
        사실입니다. 영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다.
        그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권이 당첨되어
        20억을 받았습니다. 어떤 이는 이 편지를 받았으나 96시간 이내 자신의
        손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야
        이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 미국의
        케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는
        암살 당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을
        것이고 그렇지 않으면 3년의 불행이 있을 것입니다. 그리고 이 편지를
        버리거나 낙서를 해서는 절대로 안됩니다. 7통입니다. 이 편지를 받은 사람은
        행운이 깃들 것입니다. 힘들겠지만 좋은게 좋다고 생각하세요. 7년의 행운을
        빌면서...
       </DataName>
      </Container>
     </Data>
    </ScrollContainer>
   </Modal>
  </OuterContainer>
 );
};
