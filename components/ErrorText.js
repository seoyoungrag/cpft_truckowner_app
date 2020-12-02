import React from "react";
import {View, Text} from "react-native";

export default (props) => {
	return (
		<View style={{flex: 1, alignItems: "center", marginTop: "50%"}}>
			<Text style={{fontSize: 20}}>통신 에러 발생</Text>
			<Text style={{fontSize: 14}}>잠시 후 새로고침을 시도해주세요</Text>
		</View>
	);
};
