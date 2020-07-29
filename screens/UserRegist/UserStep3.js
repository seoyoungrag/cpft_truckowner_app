import React, { useState, useEffect, useLayoutEffect } from "react";
import { Dimensions, Text, TouchableOpacity, Picker } from "react-native";
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
import { TextInput } from "react-native-gesture-handler";
import PatternLockContianer from "./PatternLock/PatternLockContianer";

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
 const [selectedValue, setSelectedValue] = useState("SKT");
 const [userPHAuthNumber, setUserPHAuthNumber] = useState(null);

 const goStep2 = () => {
  navigation.navigate("UserStep2");
 };
 const goToHPA1 = () => {
  navigation.push("UserStep1HPA1");
 };
 const goToHPA2 = () => {
  navigation.push("UserStep1HPA2");
 };
 const goToHPA3 = () => {
  navigation.push("UserStep1HPA3");
 };
 const goToHPA4 = () => {
  navigation.push("UserStep1HPA4");
 };
 const [userServiceAuthAgree, setUserServiceAuthAgree] = useState(
  useUserRegistInfo()?.userServiceAuthAgree
 );
 const { register, getValues, setValue, handleSubmit, errors } = useForm();
 const [userRegistInfo, setUserRegistInfoProp] = useState(useUserRegistInfo());
 const getUserRegistInfo = useGetUserRegistInfo();
 const setUserRegistInfo = useSetUserRegistInfo();

 
 const requestPHAuthNumber = () => {
    setValue("userPHAuthNumber", '123456');
    setUserPHAuthNumber('123456');
    //setUserRegistInfoProp({...userRegistInfo, userPHAuthNumber: '123456'})
 }
 const confrimBtnClicked = (userRegistInfo) => {
    userRegistInfo.userPHAuthNumber = undefined;
  setUserRegistInfo(userRegistInfo);
  navigation.navigate("UserStep3");
 };

 useEffect(() => {
    setValue("userPHAuthNumber", '123456');},[userPHAuthNumber]);
 useEffect(() => {
  register(
   { name: "userPHNumber" },
   {
    minLength: 13,
    maxLength: 13,
    required: true,
   }
  );
  register(
   { name: "userPHAuthNumber" },
   {
    minLength: 6,
    maxLength: 6,
    required: true,
   }
  );
  register(
   { name: "userServiceAuthAgree" },
   {
    required: true,
   }
  );
 }, [register]);
 useEffect(() => {
  if (userRegistInfo) {
   setValue("userPHNumber", userRegistInfo?.userPHNumber);
   setValue("userPHAuthNumber", userRegistInfo?.userPHAuthNumber);
   setValue("userServiceAuthAgree", userRegistInfo?.userServiceAuthAgree);
   //setValue(userRegistInfo);
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
      onPress={goStep2}
     >
      <AntDesign name={"leftcircle"} color={"black"} size={24} />
     </TouchableOpacity>
     <ModalHeaderTitle>3/5</ModalHeaderTitle>
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
       <DataName>잠금패턴 설정</DataName>
        <DataValue>앱 잠금패턴을 설정해주세요.</DataValue>
        <View style={{flex:1, height:500, backgroundColor:"red"}}>
       <PatternLockContianer loginSuccess={null} />
       </View>
     </Data>
    </ScrollContainer>

    <ModalFooter>
     <ConfirmBtn onPress={handleSubmit(confrimBtnClicked)}>
      <ConfirmBtnText>다음</ConfirmBtnText>
     </ConfirmBtn>
    </ModalFooter>
   </Modal>
  </OuterContainer>
 );
};
