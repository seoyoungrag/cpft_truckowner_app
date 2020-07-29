import React, { useState, useEffect, useLayoutEffect } from "react";
import { Dimensions, Text } from "react-native";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import {
 useUserRegistInfo,
 useGetUserRegistInfo,
 useSetUserRegistInfo,
} from "../../UserRegistContext";
import ScrollContainer from "../../components/ScrollContainer";
import { View } from "react-native-animatable";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import { TouchableOpacity } from "react-native-gesture-handler";

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

const DataValue = styled.Text`
 margin-left: 40px;
 margin-right: 40px;
 color: black;
 opacity: 0.8;
 font-weight: 500;
 font-size: 16px;
`;

const DataValueBtn = styled.TouchableOpacity`
 width: ${(screenWidth * 3) / 4}px;
 border-width: 1px;
 border-radius: 10px;
 border-color: silver;
 padding: 10px;
 margin-top: 10px;
 margin-left: 40px;
 margin-right: 40px;
 color: black;
 opacity: 0.8;
 font-weight: 500;
 font-size: 16px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const DataValueBtnSec = styled.TouchableOpacity`
 width: ${(screenWidth * 3) / 4}px;
 border-width: 1px;
 border-radius: 10px;
 border-color: silver;
 padding: 10px;
 margin-top: 10px;
 margin-left: 40px;
 margin-right: 40px;
 color: black;
 opacity: 0.8;
 font-weight: 500;
 font-size: 16px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const DataValueRed = styled.Text`
 width: 200px;
 margin-left: 40px;
 margin-right: 40px;
 color: red;
 opacity: 0.8;
 font-weight: 500;
 border-radius: 10px;
`;
export default ({ navigation }) => {
 const goBack = () => {
  navigation.navigate("UserStep1");
 };
 const [userHPAuthAgree, setUserHPAuthAgree] = useState(null);
 const { register, getValues, setValue, handleSubmit, errors } = useForm();
 const [userRegistInfo, setUserRegistInfoProp] = useState(useUserRegistInfo());
 const getUserRegistInfo = useGetUserRegistInfo();
 const setUserRegistInfo = useSetUserRegistInfo();
 const confrimBtnClicked = async (userRegistInfo) => {
  setUserRegistInfo(userRegistInfo);
 };

 useEffect(() => {
  register({ name: "userNm" }, { required: true });
  register({ name: "userBirthDate" }, { required: true });
  register(
   { name: "userSex" },
   {
    required: true,
    minLength: 1,
    maxLength: 1,
    validate: (value) => {
     if (value == 1 || value == 2) {
      return true;
     } else {
      return false;
     }
    },
   }
  );
  register({ name: "userHPAuthAgree" }, { required: true });
 }, [register]);
 useLayoutEffect(() => {}, [register]);
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
     <ModalHeaderTitle>개인정보 수집</ModalHeaderTitle>
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
        이 글을 본 당신생명이 하루밖에 남지 않았습니다. 정말 죄송합니다. 저도
        이런 글 올리는 것 죄송한데요 제 친구도 제 말을 거짓말로 알았다가
        죽었습니다. 여러분께 피해 입히지 않기 위해 이 글 씁니다. 여러분이 이
        글을 보고 바로 끄면 끄는 순간 당신의 목숨이 끝나는 것은 시작됩니다. 끌
        때부터 24시간 너무 짧은 시간입니다. 당신의 목숨 제가 살리겠습니다. 만약
        24시간 내에 당신이 죽지 않는다면 매일 밤 새벽2시에 얼굴이 반쪽이고 눈이
        파란 귀신이 찾아와 당신을 죽이려고 할 것입니다.이 글을 다른곳에 딱 3번만
        복사해서 올려도 좋습니다. 시간은 44분 입니다. 이 글을 다른곳에 복사하면
        사랑하는 사람에게 고백을 받을 것입니다.
       </DataName>
      </Container>
     </Data>
    </ScrollContainer>
   </Modal>
  </OuterContainer>
 );
};
