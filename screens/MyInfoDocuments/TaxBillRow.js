import React from "react";
import * as Calc from "../../components/Calc";
import {View, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default (props) => {
	const navigation = useNavigation();
	return (
		<View style={{borderBottomWidth: 3, borderBottomColor: "#efefef", paddingBottom: 20, justifyContent: "space-around", flexDirection: "row", paddingTop: 20}}>
			<View>
				<Text style={{fontSize: 14}}>{Calc.getDateStr(new Date(props?.data?.yearMonth)) || "-"}</Text>
			</View>
			<View>
				<Text style={{fontSize: 14}}>{props?.data?.owrProfsNm || "-"}</Text>
			</View>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("TaxBillDetail", {
						screen: "TaxBillDetail",
						params: {
							targetMonth: Calc.getMonthStr(new Date(props.data.yearMonth)),
							taxBillSeq: props.data.taxBillSeq,
							businessType: props.data.businessType,
							taxBillType: props.data.taxbilType,
						},
					});
				}}
			>
				<Text style={{color: "blue", fontSize: 14}}>{props.data.businessType === "간이" && props.data.taxbilType === "간이" ? "운송료 영수증" : "세금계산서"}</Text>
			</TouchableOpacity>
		</View>
	);
};
