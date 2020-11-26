import React from "react";
import * as Calc from "../../components/Calc";
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";

export default (props) => {
	const navigation = useNavigation();
	return (
		<View style={{borderBottomWidth: 3, borderBottomColor: "#efefef", paddingBottom: 20, justifyContent: "space-around", flexDirection: "row", paddingTop: 20}}>
			<View>
				<Text style={{fontSize: 14}}>{Calc.getMonthStr(new Date(props?.data?.targetMonth)) || "-"}</Text>
			</View>
			<View>
				<Text style={{fontSize: 14}}>{props?.data?.owrProfsNm || "-"}</Text>
			</View>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("DocketForm", {
						screen: "DocketFormContainer",
						params: {
							screen: props?.data?.docketForm,
							params: {
								targetMonth: props?.data?.targetMonth,
								matchingCode: props?.data?.matchingCode,
							},
						},
					});
				}}
			>
				<Text style={{color: "blue", fontSize: 14}}>명세서</Text>
			</TouchableOpacity>
		</View>
	);
};
