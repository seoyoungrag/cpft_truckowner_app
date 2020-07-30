import React, { useState, useEffect, useLayoutEffect } from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
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
 font-weight: bold;
 font-size: 32px;
 margin-left: 40px;
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
 const goStep3 = () => {
  navigation.navigate("UserStep3");
 };
 const { register, getValues, setValue, handleSubmit, errors } = useForm();
 const [userRegistInfo, setUserRegistInfoProp] = useState(useUserRegistInfo());
 const getUserRegistInfo = useGetUserRegistInfo();
 const setUserRegistInfo = useSetUserRegistInfo();

 console.log("step4", userRegistInfo);
 const confrimBtnClicked = async (userRegistInfoForm) => {
  const newValue = Object.assign({}, userRegistInfo, userRegistInfoForm);
  await setUserRegistInfo(newValue);
  navigation.navigate("UserStep5");
 };

 useEffect(() => {});
 useEffect(() => {
  register(
   { name: "carNum" },
   {
    required: true,
   }
  );
  register(
   { name: "corpNum" },
   {
    required: true,
   }
  );
  register(
   { name: "corpNm" },
   {
    required: true,
   }
  );
  register(
   { name: "corpRpresentNm" },
   {
    required: true,
   }
  );
  register(
   { name: "corpCategory" },
   {
    required: true,
   }
  );
  register(
   { name: "corpType" },
   {
    required: true,
   }
  );
  register(
   { name: "userAddress" },
   {
    required: true,
   }
  );
 }, [register]);
 useEffect(() => {
  if (userRegistInfo) {
   setValue("carNum", userRegistInfo?.carNum);
   setValue("corpNum", userRegistInfo?.corpNum);
   setValue("corpNm", userRegistInfo?.corpNm);
   setValue("corpRpresentNm", userRegistInfo?.corpRpresentNm);
   setValue("corpCategory", userRegistInfo?.corpCategory);
   setValue("corpType", userRegistInfo?.corpType);
   setValue("userAddress", userRegistInfo?.userAddress);
  }
 }, [userRegistInfo]);
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
      onPress={goStep3}
     >
      <AntDesign name={"leftcircle"} color={"black"} size={24} />
     </TouchableOpacity>
     <ModalHeaderTitle>4/5</ModalHeaderTitle>
    </ModalHeader>
    <ScrollContainer
     loading={false}
     contentContainerStyle={{
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
       <DataName>추가정보를 입력해주세요.</DataName>
       <FloatingLabelInput
        maxLength={11}
        label="차량 번호"
        placeholder="차량 번호"
        onChangeText={setValue}
        fieldNm="carNum"
        containerStyle={{
         marginLeft: 40,
         marginRight: 40,
        }}
        style={{
         color: "black",
         opacity: 0.8,
         fontWeight: 500,
         fontSize: 32,
         borderBottomWidth: 1,
        }}
        value={getValues("carNum")}
        defaultValue={userRegistInfo?.carNum}
       />
       {errors.carNum && <DataValueRed>필수 값 입니다.</DataValueRed>}
       <FloatingLabelInput
        maxLength={12}
        keyboardTypeAddOn={"corpNum"}
        keyboardType={"numeric"}
        label="사업자 번호"
        placeholder="사업자 번호"
        onChangeText={setValue}
        fieldNm="corpNum"
        containerStyle={{
         marginLeft: 40,
         marginRight: 40,
        }}
        style={{
         color: "black",
         opacity: 0.8,
         fontWeight: 500,
         fontSize: 32,
         borderBottomWidth: 1,
        }}
        value={getValues("corpNum")}
        defaultValue={userRegistInfo?.corpNum}
       />
       {errors.corpNum && <DataValueRed>필수 값 입니다.</DataValueRed>}
       <FloatingLabelInput
        maxLength={6}
        label="회사명"
        placeholder="회사명"
        onChangeText={setValue}
        fieldNm="corpNm"
        containerStyle={{
         marginLeft: 40,
         marginRight: 40,
        }}
        style={{
         color: "black",
         opacity: 0.8,
         fontWeight: 500,
         fontSize: 32,
         borderBottomWidth: 1,
        }}
        value={getValues("corpNm")}
        defaultValue={userRegistInfo?.corpNm}
       />
       {errors.corpNm && <DataValueRed>필수 값 입니다.</DataValueRed>}
       <FloatingLabelInput
        maxLength={6}
        label="대표자명"
        placeholder="대표자명"
        onChangeText={setValue}
        fieldNm="corpRpresentNm"
        containerStyle={{
         marginLeft: 40,
         marginRight: 40,
        }}
        style={{
         color: "black",
         opacity: 0.8,
         fontWeight: 500,
         fontSize: 32,
         borderBottomWidth: 1,
        }}
        value={getValues("corpRpresentNm")}
        defaultValue={userRegistInfo?.corpRpresentNm}
       />
       {errors.corpRpresentNm && <DataValueRed>필수 값 입니다.</DataValueRed>}
       <FloatingLabelInput
        maxLength={6}
        label="업태"
        placeholder="업태"
        onChangeText={setValue}
        fieldNm="corpCategory"
        containerStyle={{
         marginLeft: 40,
         marginRight: 40,
        }}
        style={{
         color: "black",
         opacity: 0.8,
         fontWeight: 500,
         fontSize: 32,
         borderBottomWidth: 1,
        }}
        value={getValues("corpCategory")}
        defaultValue={userRegistInfo?.corpCategory}
       />
       {errors.corpCategory && <DataValueRed>필수 값 입니다.</DataValueRed>}
       <FloatingLabelInput
        maxLength={6}
        label="업종"
        placeholder="업종"
        onChangeText={setValue}
        fieldNm="corpType"
        containerStyle={{
         marginLeft: 40,
         marginRight: 40,
        }}
        style={{
         color: "black",
         opacity: 0.8,
         fontWeight: 500,
         fontSize: 32,
         borderBottomWidth: 1,
        }}
        value={getValues("corpType")}
        defaultValue={userRegistInfo?.corpType}
       />
       {errors.corpType && <DataValueRed>필수 값 입니다.</DataValueRed>}
       <FloatingLabelInput
        maxLength={6}
        label="주소"
        placeholder="주소"
        onChangeText={setValue}
        fieldNm="userAddress"
        containerStyle={{
         marginLeft: 40,
         marginRight: 40,
        }}
        style={{
         color: "black",
         opacity: 0.8,
         fontWeight: 500,
         fontSize: 32,
         borderBottomWidth: 1,
        }}
        value={getValues("userAddress")}
        defaultValue={userRegistInfo?.userAddress}
       />
       {errors.userAddress && <DataValueRed>필수 값 입니다.</DataValueRed>}
      </Container>
     </Data>
    </ScrollContainer>

    <ModalFooter>
     <ConfirmBtn onPress={handleSubmit(confrimBtnClicked)}>
      <ConfirmBtnText>완료</ConfirmBtnText>
     </ConfirmBtn>
    </ModalFooter>
   </Modal>
  </OuterContainer>
 );
};
