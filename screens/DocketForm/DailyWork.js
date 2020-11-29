import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import * as Calc from "../../components/Calc";
import * as rq from "react-query";
import ScrollContainer from "../../components/ScrollContainer";
import {useIsModal} from "../../ModalContext";
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from "accordion-collapse-react-native";
import axios from "axios";
import DailyWorkDetail from "./Details/DailyWorkDetail";
import {useToken} from "../../AuthContext";

export default ({navigation, route}) => {
	const {matchingCode, targetMonth} = route.params;
	const [status, setStatus] = React.useState({
		isOpen1: false,
		isOpen2: false,
		isOpen3: false,
	});

	const {isOpen1, isOpen2, isOpen3} = status;

	rq.setConsole({
		log: console.log,
		warn: console.warn,
		error: console.warn,
	});

	const token = useToken();

	const dataInfo = rq.useQuery(
		"getDtstmnPreView",
		async () => {
			return await axios.post(
				"https://blueapi.teamfresh.co.kr/v2/trans/getDtstmnPreView",
				{
					matchingCode: matchingCode,
					deliveryDate: targetMonth,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"X-AUTH-TOKEN": `${token}`,
					},
				}
			);
		},
		{
			retry: 0,
			onSuccess: (data) => {},
			onError: (error) => {},
		}
	);

	const dailyWorkInfo = rq.useQuery(
		"getDailyWorkList",
		async () => {
			return await axios.post(
				"https://blueapi.teamfresh.co.kr/v2/trans/getDailyWorkList",
				{
					matchingCode: matchingCode,
					deliveryDate: targetMonth,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"X-AUTH-TOKEN": `${token}`,
					},
				}
			);
		},
		{
			retry: 0,
			enabled: dataInfo?.status === "success",
			onSuccess: (data) => {},
			onError: (error) => {},
		}
	);

	return (
		<ScrollContainer
			loading={false}
			contentContainerStyle={{
				backgroundColor: useIsModal() ? "rgba(255,0,0,0.5)" : "white",
			}}
		>
			{dataInfo?.status === "success" && (
				<View style={{padding: 20}}>
					<View style={{flexDirection: "row", justifyContent: "space-between"}}>
						<Text style={{fontSize: 15}}>화주사: {dataInfo?.data?.data?.data?.owrProfsNm || "-"}</Text>
						<Text style={{fontSize: 15}}>{dataInfo?.data?.data?.data?.truckManagerNm || "-"} 님</Text>
					</View>
					<View style={{backgroundColor: "white", marginTop: 10, padding: 17}}>
						<View style={{flexDirection: "row", justifyContent: "flex-start"}}>
							<Text style={{fontWeight: "bold", fontSize: 18, color: "black"}}>{Calc.getMonthStr(new Date(targetMonth)) || "-"}월</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "center"}}>
							<Text style={{fontSize: 15}}>총 지급액</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "center"}}>
							<Text style={{fontSize: 23, color: "#3e50b4", fontWeight: "bold"}}>{Calc.regexWON(dataInfo?.data?.data?.data?.totalPayment) || "-"}원</Text>
						</View>
						<View style={{borderTopWidth: 3, borderTopColor: "#efefef", marginTop: 5, paddingTop: 15}}>
							<Text style={{fontWeight: "bold", color: "black"}}>
								<Image source={require("../../assets/img/icon_plus.png")} />
								&nbsp;지급
							</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
							<Text>용차배송ⓐ</Text>
							<Text style={{fontWeight: "bold"}}>{Calc.regexWON(dataInfo?.data?.data?.data?.transportCharges) || "-"}원</Text>
						</View>
						<View style={{marginTop: 30}}>
							<Text style={{fontWeight: "bold", color: "black"}}>
								<Image source={require("../../assets/img/icon_minus.png")} />
								&nbsp;공제
							</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 10}}>
							<Text>선입금 수수료ⓑ</Text>
							<Text>{Calc.regexWON(dataInfo?.data?.data?.data?.commission) || "-"}원</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 30}}>
							<Text>공급가액ⓐ-ⓑ</Text>
							<Text>{Calc.regexWON(dataInfo?.data?.data?.data?.supplyValue) || "-"}원</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 20}}>
							<Text>소계ⓒ</Text>
							<Text style={{color: "#3e50b4", fontWeight: "bold"}}>{Calc.regexWON(dataInfo?.data?.data?.data?.subTotal) || "-"}원</Text>
						</View>
						<View style={{paddingTop: 20, borderTopWidth: 1, borderTopColor: "#b8b8b8"}}>
							<Text style={{fontWeight: "bold", color: "black"}}>
								<Image source={require("../../assets/img/icon_income.png")} />
								&nbsp;입금액
							</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
							<Text>소계ⓒ</Text>
							<Text>{Calc.regexWON(dataInfo?.data?.data?.data?.subTotal) || "-"}원</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
							<Text>패널티ⓓ</Text>
							<Text>{Calc.regexWON(dataInfo?.data?.data?.data?.penalty) || "-"}원</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderTopColor: "#efefef", borderTopWidth: 1, paddingTop: 15}}>
							<Text>합계ⓒ-ⓓ{dataInfo?.data?.data?.data?.payment && "-ⓔ"}</Text>
							<Text style={{fontWeight: "bold"}}>{Calc.regexWON(dataInfo?.data?.data?.data?.depositTotal)}원</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 25}}>
							<Text>선입급</Text>
							<Text>{Calc.regexWON(dataInfo?.data?.data?.data?.upftPayment) || "-"}원</Text>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 20}}>
							<Text>총 입금액</Text>
							<Text style={{fontWeight: "bold", color: "#3e50b4"}}>{Calc.regexWON(dataInfo?.data?.data?.data?.depositTotal) || "-"}원</Text>
						</View>
						<Collapse onToggle={(bool) => setStatus((prevStatus) => ({...prevStatus, isOpen1: bool}))}>
							<CollapseHeader>
								<View style={{flexDirection: "row", justifyContent: "space-between", paddingTop: 20, borderTopWidth: 1, borderTopColor: "#efefef", marginBottom: 20}}>
									<Text style={{fontWeight: "bold", color: "black"}}>
										<Image source={require("../../assets/img/icon_info.png")} style={{backgroundColor: "#21ba45"}} />
										&nbsp;용차 상세 내역
									</Text>
									{isOpen1 ? <Image source={require("../../assets/img/icon_arrow_up.png")} /> : <Image source={require("../../assets/img/icon_arrow_down.png")} />}
								</View>
							</CollapseHeader>
							<CollapseBody>
								<View
									style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#efefef", paddingBottom: 10}}
								>
									<Text>배송날짜</Text>
									<Text>화주사</Text>
									<Text style={{paddingLeft: 10, paddingRight: 20}}>금액</Text>
								</View>
								<View style={{marginBottom: 20}}>
									{dailyWorkInfo.status === "success" &&
										dailyWorkInfo.data?.data?.list.map((data, index, array) => (
											<DailyWorkDetail key={index} data={data} bool={index + 1 === array.length ? true : false} array={array} />
										))}
								</View>
							</CollapseBody>
						</Collapse>
						<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 40}}>
							<View style={{borderWidth: 1, borderColor: "#3e50b4", height: 38, flex: 4, alignItems: "center", borderRadius: 5}}>
								<TouchableOpacity style={{width: "100%", height: "100%", alignItems: "center"}}>
									<Text style={{color: "#3e50b4", fontWeight: "bold", height: "100%", textAlignVertical: "center"}}>재요청</Text>
								</TouchableOpacity>
							</View>
							<View style={{flex: 1}}></View>
							<View style={{borderWidth: 1, borderColor: "#3e50b4", height: 38, flex: 4, alignItems: "center", backgroundColor: "#3e50b4", borderRadius: 5}}>
								<TouchableOpacity onPress={() => navigation.pop()} style={{width: "100%", height: "100%", alignItems: "center"}}>
									<Text style={{color: "white", fontWeight: "bold", height: "100%", textAlignVertical: "center"}}>확인</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			)}
		</ScrollContainer>
	);
};
