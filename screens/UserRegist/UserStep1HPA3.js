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
     <ModalHeaderTitle>고유식별정보 처리동의</ModalHeaderTitle>
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
        홍콩 풍수전문가에 의하면 올해 2월과같은달은 우리인생에서 다시오지 않는다
        합니다. 왜냐하면
        월요일이4일,화요일4일,수요일4일,목요일4일,금요일4일,토요일4일,일요일4일
        즉 모든요일이 4일로 구성되있어서 입니다. 이런2월은 823년에 한번씩
        발생합니다. 이를 엄청난부자달이라 부릅니다. 그래서 최소5명이나 5그룹과
        이 내용을 공유하면 4일이내에 돈이 도착합니다. 중국풍수에 근거하면 이글을
        읽은후 11분이내에 공유해야 한다합니다. 모두들~ 대박나세요~
       </DataName>
      </Container>
     </Data>
    </ScrollContainer>
   </Modal>
  </OuterContainer>
 );
};
