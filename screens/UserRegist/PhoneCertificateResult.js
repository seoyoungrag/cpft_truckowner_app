import React from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";

export default function PhoneCertificateResult({ navigation, route }) {
 const response = route.params.response;
 const { success, imp_uid, merchant_uid, error_msg } = response;

 const isSuccess = success === true;

 return (
  <View>
   {/*<Icon
        style={icon}
        type="AntDesign"
        name={isSuccess ? 'checkcircle' : 'exclamationcircle'}
      /> */}
   <Text>{`본인인증에 ${isSuccess ? "성공" : "실패"}하였습니다`}</Text>
   <View>
    <View>
     <Text>아임포트 번호</Text>
     <Text>{imp_uid}</Text>
    </View>
    {isSuccess ? (
     <View>
      <Text>주문번호</Text>
      <Text>{merchant_uid}</Text>
     </View>
    ) : (
     <View>
      <Text>에러메시지</Text>
      <Text>{error_msg}</Text>
     </View>
    )}
   </View>
   <TouchableOpacity
    bordered
    transparent
    onPress={() => navigation.navigate("UserStep2")}
   >
    {/*<Icon name="arrow-back" style={btnIcon} />*/}
    <Text>돌아가기</Text>
   </TouchableOpacity>
  </View>
 );
}
