import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Entypo} from "@expo/vector-icons";

export default (props) => {
	return (
		<View style={{flex: 1, marginTop: 20, paddingHorizontal: 20}}>
			<View style={{flexDirection: "row", marginBottom: 20}}>
				<Text style={{color: "grey", fontSize: 20}}>서비스 약관</Text>
			</View>
			<View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 20}}>
				<Text style={{color: "grey", fontSize: 20, marginLeft: 10}}>서비스 이용약관</Text>
				<TouchableOpacity
					onPress={() => {
						props.navigation.navigate("ServiceUse");
					}}
				>
					<Entypo name="chevron-right" size={20} />
				</TouchableOpacity>
			</View>
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<Text style={{color: "grey", fontSize: 20, marginLeft: 10}}>개인정보 처리방침</Text>
				<TouchableOpacity
					onPress={() => {
						props.navigation.navigate("PersonalInfo");
					}}
				>
					<Entypo name="chevron-right" size={20} />
				</TouchableOpacity>
			</View>
		</View>
	);
};
