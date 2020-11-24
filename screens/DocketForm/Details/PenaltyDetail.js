import React from "react";
import {View, Text} from "react-native";
import * as Calc from "../../../components/Calc";

export default (props) => {
	let total = 0;
	if (props.bool) {
		props.array.map((data) => (total += data.penaltyValue));
	}
	return (
		<>
			<View style={{flexDirection: "row", justifyContent: "flex-start", marginVertical: 5}}>
				<Text style={{fontWeight: "bold", marginRight: 15}}>{props.index}</Text>
				<Text style={{marginRight: 30}}>차감사유</Text>
				<Text>{props.data.reasonOfDeduction}</Text>
			</View>
			<View style={{flexDirection: "row", justifyContent: "flex-start", marginVertical: 5}}>
				<Text style={{marginLeft: 23, marginRight: 57}}>일자</Text>
				<Text>{Calc.getDateStr(new Date(props.data.deliveryDate))}</Text>
			</View>
			<View style={{flexDirection: "row", justifyContent: "flex-start", marginVertical: 5}}>
				<Text style={{marginLeft: 23, marginRight: 30}}>실수령지</Text>
				<Text>{props.data.targetAddress}</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-start",
					marginTop: 5,
					paddingBottom: 15,
					marginBottom: 10,
					borderBottomWidth: 1,
					borderBottomColor: "#efefef",
				}}
			>
				<Text style={{marginLeft: 23, marginRight: 57}}>금액</Text>
				<Text>{Calc.regexWON(props.data.penaltyValue)}원</Text>
			</View>
			{props.bool && (
				<View style={{flexDirection: "row", justifyContent: "space-between"}}>
					<Text>합계</Text>
					<Text style={{fontWeight: "bold", color: "#3e50b4"}}>{Calc.regexWON(total)}원</Text>
				</View>
			)}
		</>
	);
};
