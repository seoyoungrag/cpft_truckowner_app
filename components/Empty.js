import React from "react";
import {View, Text} from "react-native";

export default (props) => {
	return (
		<View style={{flex: 1, alignItems: "center", marginTop: "50%"}}>
			<Text style={{fontSize: 20}}>조회할 내역이 존재하지 않습니다</Text>
		</View>
	);
};
