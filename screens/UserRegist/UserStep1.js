import React, { useState, useEffect } from "react";
import { Dimensions, Text } from "react-native";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import {
 useUserRegistInfo,
 useGetUserRegistInfo,
 useSetUserRegistInfo,
} from "../../UserRegistContext";
import ScrollContainer from "../../components/ScrollContainer";
import { TextInput } from "react-native-gesture-handler";
import { View } from "react-native-animatable";

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
 color: black;
 font-weight: bold;
 font-size: 24px;
`;

const OuterContainer = styled.SafeAreaView`
 flex: 1;
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
 margin-bottom: 15px;
 margin-left: 40px;
 flex: 1;
 background-color: red;
`;

const DataValue = styled.TextInput`
 width: 200px;
 margin-left: 40px;
 margin-right: 40px;
 color: black;
 opacity: 0.8;
 font-weight: 500;
 flex: 1;
 border-bottom-width: 1px;
 background-color: green;
`;
const DataValueRed = styled.Text`
 margin-left: 40px;
 margin-right: 40px;
 color: red;
 opacity: 0.8;
 font-weight: 500;
 flex: 1;
 border-radius: 10px;
 padding: 10px;
 margin-top: 10px;
`;
export default ({ navigation }) => {
 const { register, setValue, handleSubmit, errors } = useForm();
 const [userRegistInfo, setUserRegistInfoProp] = useState(useUserRegistInfo());
 const getUserRegistInfo = useGetUserRegistInfo();
 const setUserRegistInfo = useSetUserRegistInfo();
 const confrimBtnClicked = async (userRegistInfo) => {
  setUserRegistInfo(userRegistInfo);
 };
 const screenWidth = Math.round(Dimensions.get("window").width);
 const screenHeight = Math.round(Dimensions.get("window").height);

 useEffect(() => {
  register({ name: "userNm" }, { required: true });
  register({ name: "userBirthDate" }, { required: true });
  register({ name: "userSex" }, { required: true });
 }, [register]);
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
    <Data style={{ width: screenWidth, height: screenHeight - 250 }}>
     <Container>
      <DataName>이름</DataName>
      <DataValue
       placeholder="이름 입력"
       onChangeText={(text) => setValue("userNm", text, true)}
      />
      {errors.userNm && <DataValueRed>필수 값 입니다.</DataValueRed>}

      <DataName>주민등록 번호</DataName>
      <View style={{ flex: 1, flexDirection: "row" }}>
       <View style={{ flex: 1, flexDirection: "column" }}>
        <DataValue
         placeholder="8자리 입력"
         onChangeText={(text) => setValue("userBirthDate", text)}
        />
        {errors.userBirthDate && <DataValueRed>필수 값 입니다.</DataValueRed>}
       </View>
       <View style={{ flex: 1, flexDirection: "column" }}>
        <DataValue onChangeText={(text) => setValue("userSex", text)} />
        {errors.userSex && <DataValueRed>필수 값 입니다.</DataValueRed>}
       </View>
      </View>
     </Container>
    </Data>
   </ScrollContainer>

   <ModalFooter>
    <ConfirmBtn onPress={handleSubmit(confrimBtnClicked)}>
     <ConfirmBtnText>다음</ConfirmBtnText>
    </ConfirmBtn>
   </ModalFooter>
  </OuterContainer>
 );
};
