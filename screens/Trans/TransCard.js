import React from "react";
import {Text, View, Modal, TouchableOpacity} from "react-native";
import * as Calc from "../../components/Calc";
import * as rq from "react-query";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";

export default (props) => {
	const navigation = useNavigation();

	const [updateCall] = rq.useMutation(
		(obj) => {
			axios.post("https://blueapi.teamfresh.co.kr/v2/trans/updateApproveStatus", obj);
		},
		{
			onSuccess: async (data, mutationVariables) => {},
		}
	);

	const updateCheckYn = React.useCallback(() => {
		const obj = {
			matchingCode: props.data.matchingCode,
			targetMonth: props.data.targetMonth,
			excelSeq: props.data.excelSeq,
		};
		updateCall(obj);
	}, [props]);

	return (
		<>
			<View style={{padding: 15}}>
				<View style={{borderWidth: 1, borderColor: "black", padding: 15, borderRadius: 10, backgroundColor: "white"}}>
					<View>
						<View style={{flexDirection: "row", marginBottom: 5, justifyContent: "space-between"}}>
							<Text style={{fontWeight: "bold", fontSize: 20}}>{props.data.carrierNm}</Text>
							<Text style={{fontSize: 20}}>{props.data.fixingDailyWork}</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "center"}}>
							<Text style={{fontWeight: "bold", fontSize: 20}}>{props.data.owrProfsNm}</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "center"}}>
							<Text style={{fontWeight: "bold", fontSize: 25}}>{Calc.regexWON(props.data.total)}</Text>
						</View>
					</View>
					<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
						<View style={{flex: 11, alignItems: "center", borderWidth: 1, borderColor: "#3e50b4", borderRadius: 5, height: 38}}>
							<TouchableOpacity
								style={{width: "100%", height: "100%", alignItems: "center"}}
								onPress={() => {
									navigation.navigate("DocketForm", {
										screen: "DocketFormContainer",
										params: {
											screen: props.data.docketForm,
											params: {
												targetMonth: props.targetMonth,
												driverSeq: props.data.driverSeq,
												carrierSeq: 1,
												taxBillSeq: props.data.taxBillSeq,
												taxBillItemSeq: props.data.taxBillItemSeq,
												matchingCode: props.data.matchingCode,
												// truckManagerCode: props.data.truckManagerCode,
												// excelSeq: props.data.excelSeq,
											},
										},
									});
									updateCheckYn();
								}}
							>
								<Text style={{color: "#3e50b4", fontSize: 18, height: "100%", textAlignVertical: "center", fontWeight: "bold"}}>명세서</Text>
							</TouchableOpacity>
						</View>
						<View style={{flex: 1}}></View>
						<View style={{flex: 11, alignItems: "center", borderWidth: 1, borderColor: "#3e50b4", borderRadius: 5, backgroundColor: "#3e50b4", height: 38}}>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("TaxBillDetail", {
										screen: "TaxBillDetail",
										params: {
											screen: props.data.docketForm,
											params: {
												targetMonth: props.targetMonth,
												driverSeq: props.data.driverSeq,
												carrierSeq: 1,
												carryingSeq: props.data.carryingSeq,
												taxBillSeq: props.data.taxBillSeq,
												taxBillItemSeq: props.data.taxBillItemSeq,
												matchingCode: props.data.matchingCode,
												// truckManagerCode: props.data.truckManagerCode,
												// excelSeq: props.data.excelSeq,
											},
										},
									})
								}
								style={{width: "100%", height: "100%", alignItems: "center"}}
							>
								<Text style={{color: "white", fontSize: 18, height: "100%", textAlignVertical: "center", fontWeight: "bold"}}>세금계산서</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</>
	);
};
