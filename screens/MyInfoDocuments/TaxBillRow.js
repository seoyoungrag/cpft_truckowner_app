import React from "react";
import * as Calc from "../../components/Calc";
import {View, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default (props) => {
	const navigation = useNavigation();
	return (
		<View style={{borderBottomWidth: 3, borderBottomColor: "#efefef", paddingBottom: 20, justifyContent: "space-around", flexDirection: "row", paddingTop: 20}}>
			<View>
				<Text style={{fontSize: 14}}>{Calc.getDateStr(new Date(props?.data?.targetMonth)) || "-"}</Text>
			</View>
			<View>
				<Text style={{fontSize: 14}}>{props?.data?.owrProfsNm || "-"}</Text>
			</View>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("TaxBillDetail", {
						screen: "TaxBillDetail",
						params: {
							targetMonth: Calc.getMonthStr(new Date(props.data.targetMonth)),
							taxBillSeq: props.data.taxBillSeq,
							// screen: props.data.docketForm,
							// params: {
							// driverSeq: props.data.driverSeq,
							// carrierSeq: 1,
							// carryingSeq: props.data.carryingSeq,
							// taxBillItemSeq: props.data.taxBillItemSeq,
							// matchingCode: props.data.matchingCode,
							// truckManagerCode: props.data.truckManagerCode,
							// excelSeq: props.data.excelSeq,
							// },
						},
					});
				}}
			>
				<Text style={{color: "blue", fontSize: 14}}>세금계산서</Text>
			</TouchableOpacity>
		</View>
	);
};
