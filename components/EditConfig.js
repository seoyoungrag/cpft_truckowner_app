import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Entypo} from "@expo/vector-icons";

export default (props) => {
	return (
		<View style={{flex: 1, marginTop: 20, paddingHorizontal: 20}}>
			<View style={{flexDirection: "row", marginBottom: 20}}>
				<Text style={{color: "grey", fontSize: 20}}>로그인 설정/변경</Text>
			</View>
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<Text style={{color: "grey", fontSize: 20, marginLeft: 10}}>잠금패턴 설정</Text>
				<TouchableOpacity
					onPress={() => {
						// props.navigation.navigage("")
					}}
				>
					<Entypo name="chevron-right" size={20} />
				</TouchableOpacity>
			</View>
		</View>
	);
};
