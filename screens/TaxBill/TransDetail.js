import React from "react";
import {View, Text} from "react-native";
import * as Calc from "../../components/Calc";

export default (props) => {
	let total = 0;
	if (props.bool) {
		props.array.map((data) => (total += data.supplyValue + data.taxAm));
	}

	return (
		<>
			<View style={{flexDirection: "row", justifyContent: "space-around", marginVertical: 5}}>
				<Text style={{color: "black", fontSize: 15}}>{Calc.getDateStr(new Date(props.data.issuDate)) || "-"}</Text>
				<Text style={{color: "black", fontSize: 15}}>{props.data.productList || "-"}</Text>
				<Text style={{color: "black", fontSize: 15}}>{Calc.regexWON(props.data.supplyValue + props.data.taxAm) || "-"}원</Text>
			</View>
			{props.bool && (
				<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
					<Text>합계</Text>
					<Text style={{fontWeight: "bold", color: "#3e50b4"}}>{Calc.regexWON(total) || "-"}원</Text>
				</View>
			)}
		</>
	);
};
