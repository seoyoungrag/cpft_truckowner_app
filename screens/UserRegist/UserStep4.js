import React, { useState, useEffect, useRef } from "react";
import { Dimensions, TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import {
 useGetUserRegistInfo,
 useSetUserRegistInfo,
} from "../../UserRegistContext";
import ScrollContainer from "../../components/ScrollContainer";
import FloatingLabelInput from "../../components/FloatingLabelInput";

const screenWidth = Math.round(Dimensions.get("window").width);

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
 align-items: center;
 flex-direction: row;
 justify-content: space-between;
`;
const ModalHeaderTitle = styled.Text`
 color: #303030;
 font-size: 16px;
`;

const ModalFooter = styled.View`
 bottom: 0px;
 left: 0px;
 right: 0px;
 height: 50px;
 align-items: center;
`;

const ConfirmBtn = styled.TouchableOpacity`
 width: 80%;
 height: 80%;
 justify-content: center;
 background-color: #3e50b4;
 border-radius: 5px;
`;
const ConfirmBtnText = styled.Text`
 text-align: center;
 color: white;
 font-weight: bold;
 font-size: 16px;
`;

const Container = styled.View`
 flex: 1;
 flex-direction: column;
 align-items: flex-start;
`;

const DataName = styled.Text`
 margin-top: 30px;
 color: #0d0d0d;
 opacity: 0.8;
 font-weight: bold;
 font-size: 20px;
 margin-left: 40px;
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
export default ({ navigation, route }) => {
 const [type, setType] = useState(Camera.Constants.Type.back);
 const [hasPermission, setHasPermission] = useState(null);
 const routeParams = route.params;
 const setAddress = async (addrData) => {
  const newValue = Object.assign({}, userRegistInfo, {
   ...getValues(),
   userAddress: addrData.roadAddress + " " + addrData.zonecode,
   roadAddress: addrData.roadAddress,
   zonecode: addrData.zonecode,
  });
  await setUserRegistInfo(newValue);
 };
 const goAddrFindView = () => {
  navigation.push("UserStep4AddrFindView", { setAddress });
 };
 const goStep3 = () => {
  if (routeParams?.isFromOrder) {
   navigation.pop();
  } else {
   navigation.navigate("UserStep3");
  }
 };
 const { register, getValues, setValue, handleSubmit, errors } = useForm();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);

 const getUserRegistInfo = useGetUserRegistInfo();
 const setUserRegistInfo = useSetUserRegistInfo();

 const confrimBtnClicked = async (userRegistInfoForm) => {
  const newValue = Object.assign({}, userRegistInfo, userRegistInfoForm);
  await setUserRegistInfo(newValue);
  if (routeParams?.isFromOrder) {
   navigation.pop();
  } else {
   navigation.navigate("UserStep5");
  }
 };

 const fetchData = async () => {
  const data = await getUserRegistInfo();
  setUserRegistInfoProp(data);
  setValue("carNum", data?.carNum);
  setValue("corpNum", data?.corpNum);
  setValue("corpNm", data?.corpNm);
  setValue("corpRpresentNm", data?.corpRpresentNm);
  setValue("corpCategory", data?.corpCategory);
  setValue("corpType", data?.corpType);
  setValue("userAddress", data?.userAddress);
 };

 const setValueWithState = async (fildNm, value) => {
  await setValue(fildNm, value);
  await setUserRegistInfoProp({ ...userRegistInfo, [fildNm]: value });
  await setUserRegistInfo({ ...userRegistInfo, [fildNm]: value });
 };
 useEffect(() => {
  const unsubscribe = navigation.addListener("focus", async () => {
   if (!userRegistInfo) {
    await fetchData();
   } else {
   }
  });
  return unsubscribe;
 }, [navigation]);
 useEffect(() => {
  register(
   { name: "carNum" },
   {
    required: routeParams?.isFromOrder ? true : false,
   }
  );
  register(
   { name: "corpNum" },
   {
    required: routeParams?.isFromOrder ? true : false,
   }
  );
  register(
   { name: "corpNm" },
   {
    required: routeParams?.isFromOrder ? true : false,
   }
  );
  register(
   { name: "corpRpresentNm" },
   {
    required: routeParams?.isFromOrder ? true : false,
   }
  );
  register(
   { name: "corpCategory" },
   {
    required: routeParams?.isFromOrder ? true : false,
   }
  );
  register(
   { name: "corpType" },
   {
    required: routeParams?.isFromOrder ? true : false,
   }
  );
  register(
   { name: "userAddress" },
   {
    required: routeParams?.isFromOrder ? true : false,
   }
  );
 }, [register]);
 useEffect(() => {
  (async () => {
   const { status } = await Camera.requestPermissionsAsync();
   setHasPermission(status === "granted");
  })();
 }, []);
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
      <AntDesign name={"arrowleft"} color={"#303030"} size={24} />
     </TouchableOpacity>
     <ModalHeaderTitle>
      {routeParams?.isFromOrder ? null : "4/5"}
     </ModalHeaderTitle>
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
     <DataName>관련 서류를 업로드해주세요.</DataName>

     <View
      style={{
       paddingTop: 10,
       paddingBottom: 10,
       marginHorizontal: screenWidth / 5,
       justifyContent: "center",
       flexDirection: "row",
       flexWrap: "wrap",
      }}
     >
      <TouchableOpacity
       style={{
        backgroundColor: "white",
        width: screenWidth / 3.5,
        height: screenWidth / 3.5,
        marginRight: 5,
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderColor: "white",
        elevation: 4,
       }}
      >
       <Entypo name="text-document" size={24} color="#3e50b4" style={{}} />
       <Text style={{ color: "#0d0d0d", textAlign: "center" }}>
        사업자등록증
       </Text>
      </TouchableOpacity>
      <TouchableOpacity
       style={{
        backgroundColor: "white",
        width: screenWidth / 3.5,
        height: screenWidth / 3.5,
        marginLeft: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderColor: "white",
        elevation: 4,
       }}
      >
       <Entypo name="text-document" size={24} color="#3e50b4" style={{}} />
       <Text style={{ color: "#0d0d0d", textAlign: "center" }}>
        화물운송종사{"\r\n"}자격증
       </Text>
      </TouchableOpacity>
      <TouchableOpacity
       style={{
        backgroundColor: "white",
        width: screenWidth / 3.5,
        height: screenWidth / 3.5,
        marginRight: 5,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderColor: "white",
        elevation: 4,
       }}
      >
       <Entypo name="text-document" size={24} color="#3e50b4" style={{}} />
       <Text style={{ color: "#0d0d0d", textAlign: "center" }}>
        자동차 등록증
       </Text>
      </TouchableOpacity>
      <TouchableOpacity
       style={{
        backgroundColor: "white",
        width: screenWidth / 3.5,
        height: screenWidth / 3.5,
        marginLeft: 5,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderColor: "white",
        elevation: 4,
       }}
      >
       <Entypo name="text-document" size={24} color="#3e50b4" style={{}} />
       <Text style={{ color: "#0d0d0d", textAlign: "center" }}>통장 사본</Text>
      </TouchableOpacity>
     </View>
     <Container style={{ flex: 1, justifyContent: "flex-start", marginTop: 0 }}>
      <DataName>추가정보를 입력해주세요.</DataName>
      <FloatingLabelInput
       maxLength={11}
       label="차량 번호"
       placeholder="차량 번호"
       onChangeText={setValueWithState}
       fieldNm="carNum"
       containerStyle={{
        marginLeft: 40,
        marginRight: 40,
       }}
       style={{
        color: "black",
        opacity: 0.8,
        fontWeight: 500,
        fontSize: 18,
        borderBottomWidth: 1,
       }}
       defaultValue={userRegistInfo?.carNum}
      />
      {errors.carNum && <DataValueRed>필수 값 입니다.</DataValueRed>}
      <FloatingLabelInput
       maxLength={12}
       keyboardTypeAddOn={"corpNum"}
       keyboardType={"numeric"}
       label="사업자 번호"
       placeholder="사업자 번호"
       onChangeText={setValueWithState}
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
       defaultValue={userRegistInfo?.corpNum}
      />
      {errors.corpNum && <DataValueRed>필수 값 입니다.</DataValueRed>}
      <FloatingLabelInput
       maxLength={6}
       label="회사명"
       placeholder="회사명"
       onChangeText={setValueWithState}
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
       defaultValue={userRegistInfo?.corpNm}
      />
      {errors.corpNm && <DataValueRed>필수 값 입니다.</DataValueRed>}
      <FloatingLabelInput
       maxLength={6}
       label="대표자명"
       placeholder="대표자명"
       onChangeText={setValueWithState}
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
       defaultValue={userRegistInfo?.corpRpresentNm}
      />
      {errors.corpRpresentNm && <DataValueRed>필수 값 입니다.</DataValueRed>}
      <FloatingLabelInput
       maxLength={6}
       label="업태"
       placeholder="업태"
       onChangeText={setValueWithState}
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
       defaultValue={userRegistInfo?.corpCategory}
      />
      {errors.corpCategory && <DataValueRed>필수 값 입니다.</DataValueRed>}
      <FloatingLabelInput
       maxLength={6}
       label="업종"
       placeholder="업종"
       onChangeText={setValueWithState}
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
       defaultValue={userRegistInfo?.corpType}
      />
      {errors.corpType && <DataValueRed>필수 값 입니다.</DataValueRed>}
      <TouchableOpacity onPress={goAddrFindView}>
       <FloatingLabelInput
        editable={false}
        label="주소"
        placeholder="주소"
        onChangeText={setValueWithState}
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
        defaultValue={userRegistInfo?.userAddress}
       />
      </TouchableOpacity>
      {errors.userAddress && <DataValueRed>필수 값 입니다.</DataValueRed>}
     </Container>
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
