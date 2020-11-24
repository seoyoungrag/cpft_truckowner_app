import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {Table, Row, TableWrapper, Cell} from "react-native-table-component";
import {WebView} from "react-native-webview";

const TaxBillDetailStacks = createStackNavigator();

const TaxBillDetail = ({navigation, route}) => {
	const obj = {
		taxBillSeq: route.params.params.taxBillSeq,
		taxBillItemSeq: route.params.params.taxBillItemSeq,
		driverSeq: route.params.params.driverSeq,
		carrierSeq: route.params.params.carrierSeq,
		carryingSeq: route.params.params.carryingSeq,
		targetMonth: new Date(route.params.params.targetMonth),
	};

	console.log("bb", obj);

	return (
		<WebView source={{uri: "https://blue.teamfresh.co.kr/forApp/TaxBillDetailForApp"}}></WebView>
		// <View style={{padding: 20}}>
		// 	<View style={{flexDirection: "row", justifyContent: "space-between"}}>
		// 		<Text style={{fontSize: 15}}>2020-08월</Text>
		// 		<Text style={{fontSize: 15}}>김차주 님</Text>
		// 	</View>

		// 	<View style={{marginTop: 10, backgroundColor: "white"}}>
		// 		<Text style={{color: "red"}}>[별지 제 11호 서식]</Text>
		// 		<View style={{borderWidth: 1, borderColor: "red"}}>
		// 			<View style={{flexDirection: "row", borderBottomColor: "red", borderBottomWidth: 1}}>
		// 				<View style={{flex: 0.8, justifyContent: "center"}}>
		// 					<Text style={{fontSize: 20, color: "red", textAlign: "center"}}>세금계산서</Text>
		// 				</View>
		// 				<View style={{flex: 0.04, justifyContent: "center"}}>
		// 					<Text style={{color: "red"}}>(</Text>
		// 				</View>
		// 				<View style={{flex: 0.14, justifyContent: "center"}}>
		// 					<Text style={{color: "red", fontSize: 10}}>공급자</Text>
		// 					<Text style={{color: "red", fontSize: 10}}>보관용</Text>
		// 				</View>
		// 				<View style={{flex: 0.04, justifyContent: "center", borderRightWidth: 1, borderRightColor: "red"}}>
		// 					<Text style={{color: "red"}}>)</Text>
		// 				</View>
		// 				<View style={{flex: 0.25, borderRightWidth: 1, borderRightColor: "red"}}>
		// 					<View style={{width: "100%", borderBottomColor: "red", borderBottomWidth: 1, alignItems: "center"}}>
		// 						<Text style={{color: "red", fontSize: 10}}>책번호</Text>
		// 					</View>
		// 					<View style={{width: "100%", alignItems: "center"}}>
		// 						<Text style={{color: "red", fontSize: 10}}>일련번호</Text>
		// 					</View>
		// 				</View>
		// 				<View style={{flex: 0.3, justifyContent: "flex-end"}}>
		// 					<View style={{flexDirection: "row", borderBottomColor: "red", borderBottomWidth: 1}}>
		// 						<View style={{flex: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 						<View style={{flex: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 						<View style={{flex: 1, borderLeftColor: "red", borderLeftWidth: 1, borderRightColor: "red", borderRightWidth: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}>권</Text>
		// 						</View>
		// 						<View style={{flex: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 						<View style={{flex: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 						<View style={{flex: 1, borderLeftColor: "red", borderLeftWidth: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}>호</Text>
		// 						</View>
		// 					</View>
		// 					<View style={{flexDirection: "row"}}>
		// 						<View style={{flex: 1, borderRightColor: "red", borderRightWidth: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 						<View style={{flex: 1, borderRightColor: "red", borderRightWidth: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 						<View style={{flex: 1, borderRightColor: "red", borderRightWidth: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 						<View style={{flex: 1, borderRightColor: "red", borderRightWidth: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 						<View style={{flex: 1, borderRightColor: "red", borderRightWidth: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 						<View style={{flex: 1}}>
		// 							<Text style={{color: "red", fontSize: 10}}></Text>
		// 						</View>
		// 					</View>
		// 				</View>
		// 			</View>
		// 			<View style={{flexDirection: "row"}}>
		// 				<View style={{flex: 1, borderRightWidth: 1, borderRightColor: "red"}}>
		// 					<View style={{flexDirection: "row"}}>
		// 						<View style={{borderRightColor: "red", borderRightWidth: 1, justifyContent: "center", alignItems: "center", flex: 1}}>
		// 							<Text style={{fontSize: 10, color: "red"}}>
		// 								공{"\n"}급{"\n"}자
		// 							</Text>
		// 						</View>
		// 						<View style={{flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 3, borderRightColor: "red", borderRightWidth: 1}}>
		// 							<View style={{alignItems: "center", width: "100%"}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>등록번호</Text>
		// 							</View>
		// 							<View style={{alignItems: "center", width: "100%", borderTopColor: "red", borderTopWidth: 1, borderBottomColor: "red", borderBottomWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>상호</Text>
		// 								<Text style={{fontSize: 10, color: "red"}}>(법인명)</Text>
		// 							</View>
		// 							<View style={{alignItems: "center", width: "100%", borderBottomColor: "red", borderBottomWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>사업장</Text>
		// 								<Text style={{fontSize: 10, color: "red"}}>주소</Text>
		// 							</View>
		// 							<View style={{alignItems: "center", width: "100%"}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>업</Text>
		// 								<Text style={{fontSize: 10, color: "red"}}>태</Text>
		// 							</View>
		// 						</View>
		// 						<View style={{flexDirection: "column", flex: 9}}>
		// 							<View style={{flexDirection: "row", flex: 1, borderBottomColor: "red", borderBottomWidth: 1}}>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>1</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>4</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>3</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>-</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>3</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>4</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>-</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>0</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>0</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>5</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>3</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center"}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>9</Text>
		// 								</View>
		// 							</View>
		// 							<View style={{flexDirection: "row", flex: 2, borderBottomColor: "red", borderBottomWidth: 1}}>
		// 								<View style={{flex: 6, justifyContent: "center", alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>동흥운수</Text>
		// 								</View>
		// 								<View style={{flex: 1, borderRightWidth: 1, borderRightColor: "red"}}>
		// 									<Text style={{fontSize: 10, color: "red"}}>성명</Text>
		// 								</View>
		// 								<View style={{flex: 4, justifyContent: "center", alignItems: "center"}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>김차주</Text>
		// 								</View>
		// 								<View style={{flex: 1, justifyContent: "center", alignItems: "center", borderLeftColor: "red", borderLeftWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "red"}}>인</Text>
		// 								</View>
		// 							</View>
		// 							<View style={{flexDirection: "row", flex: 2}}>
		// 								<View style={{flex: 12, justifyContent: "center", alignItems: "center"}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>대한민국 서울시</Text>
		// 								</View>
		// 							</View>
		// 							<View style={{flexDirection: "row", flex: 2, borderTopColor: "red", borderTopWidth: 1}}>
		// 								<View style={{flex: 6, justifyContent: "center", alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>운수업</Text>
		// 								</View>
		// 								<View style={{flex: 1, borderRightWidth: 1, borderRightColor: "red"}}>
		// 									<Text style={{fontSize: 10, color: "red"}}>종목</Text>
		// 								</View>
		// 								<View style={{flex: 5, justifyContent: "center", alignItems: "center"}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>화물운송</Text>
		// 								</View>
		// 							</View>
		// 						</View>
		// 					</View>
		// 				</View>
		// 				<View style={{flex: 1}}>
		// 					<View style={{flexDirection: "row"}}>
		// 						<View style={{borderRightColor: "red", borderRightWidth: 1, justifyContent: "center", alignItems: "center", flex: 1}}>
		// 							<Text style={{fontSize: 10, color: "red"}}>
		// 								공{"\n"}급{"\n"}받{"\n"}는{"\n"}자
		// 							</Text>
		// 						</View>
		// 						<View style={{flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 3, borderRightColor: "red", borderRightWidth: 1}}>
		// 							<View style={{alignItems: "center", width: "100%"}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>등록번호</Text>
		// 							</View>
		// 							<View style={{alignItems: "center", width: "100%", borderTopColor: "red", borderTopWidth: 1, borderBottomColor: "red", borderBottomWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>상호</Text>
		// 								<Text style={{fontSize: 10, color: "red"}}>(법인명)</Text>
		// 							</View>
		// 							<View style={{alignItems: "center", width: "100%", borderBottomColor: "red", borderBottomWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>사업장</Text>
		// 								<Text style={{fontSize: 10, color: "red"}}>주소</Text>
		// 							</View>
		// 							<View style={{alignItems: "center", width: "100%"}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>업</Text>
		// 								<Text style={{fontSize: 10, color: "red"}}>태</Text>
		// 							</View>
		// 						</View>
		// 						<View style={{flexDirection: "column", flex: 9}}>
		// 							<View style={{flexDirection: "row", flex: 1, borderBottomColor: "red", borderBottomWidth: 1}}>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>5</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>6</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>1</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>-</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>8</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>8</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>-</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>0</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>1</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>1</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>3</Text>
		// 								</View>
		// 								<View style={{flex: 1, alignItems: "center"}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>8</Text>
		// 								</View>
		// 							</View>
		// 							<View style={{flexDirection: "row", flex: 2, borderBottomColor: "red", borderBottomWidth: 1}}>
		// 								<View style={{flex: 6, justifyContent: "center", alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>주식회사 팀프레시</Text>
		// 								</View>
		// 								<View style={{flex: 1, borderRightWidth: 1, borderRightColor: "red"}}>
		// 									<Text style={{fontSize: 10, color: "red"}}>성명</Text>
		// 								</View>
		// 								<View style={{flex: 4, justifyContent: "center", alignItems: "center"}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>이성일</Text>
		// 								</View>
		// 								<View style={{flex: 1, justifyContent: "center", alignItems: "center", borderLeftColor: "red", borderLeftWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "red"}}>인</Text>
		// 								</View>
		// 							</View>
		// 							<View style={{flexDirection: "row", flex: 2}}>
		// 								<View style={{flex: 12, justifyContent: "center", alignItems: "center"}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>서울시 송파구 위례성대로 12길 15-1 2층</Text>
		// 								</View>
		// 							</View>
		// 							<View style={{flexDirection: "row", flex: 2, borderTopColor: "red", borderTopWidth: 1}}>
		// 								<View style={{flex: 6, justifyContent: "center", alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>서비스</Text>
		// 								</View>
		// 								<View style={{flex: 1, borderRightWidth: 1, borderRightColor: "red"}}>
		// 									<Text style={{fontSize: 10, color: "red"}}>종목</Text>
		// 								</View>
		// 								<View style={{flex: 5, justifyContent: "center", alignItems: "center"}}>
		// 									<Text style={{fontSize: 10, color: "black", fontWeight: "bold"}}>물류대행</Text>
		// 								</View>
		// 							</View>
		// 						</View>
		// 					</View>
		// 				</View>
		// 			</View>
		// 			<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 				<View style={{flex: 2.34, borderRightColor: "red", borderRightWidth: 1, alignItems: "center", justifyContent: "center"}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>작성</Text>
		// 				</View>
		// 				<View style={{flex: 5.8, borderRightColor: "red", borderRightWidth: 1, alignItems: "center", justifyContent: "center"}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>공급가액</Text>
		// 				</View>
		// 				<View style={{flex: 4.8, borderRightColor: "red", borderRightWidth: 1, alignItems: "center", justifyContent: "center"}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>세액</Text>
		// 				</View>
		// 				<View style={{flex: 2.12, alignItems: "center", justifyContent: "center"}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>비고</Text>
		// 				</View>
		// 			</View>
		// 			<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 				<View style={{flex: 6.1, borderRightColor: "red", borderRightWidth: 1}}>
		// 					<View style={{flexDirection: "row"}}>
		// 						<View style={{flex: 1.47, borderRightColor: "red", borderRightWidth: 1, flexDirection: "row"}}>
		// 							<View style={{flex: 2, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>년</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>월</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center"}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>일</Text>
		// 							</View>
		// 						</View>
		// 						<View style={{flex: 3.6, borderRightColor: "red", borderRightWidth: 1, flexDirection: "row"}}>
		// 							<View style={{flex: 3.2, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>공란수</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>백</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>십</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>억</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>천</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>백</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>십</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>만</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>천</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>백</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>십</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center"}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>일</Text>
		// 							</View>
		// 						</View>
		// 						<View style={{flex: 3, flexDirection: "row"}}>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>십</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>억</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>천</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>백</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>십</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>만</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>천</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>백</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>십</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center"}}>
		// 								<Text style={{fontSize: 10, color: "red"}}>일</Text>
		// 							</View>
		// 						</View>
		// 					</View>
		// 					<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 						<View style={{flex: 1.47, borderRightColor: "red", borderRightWidth: 1, flexDirection: "row"}}>
		// 							<View style={{flex: 2, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>2020</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>8</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center"}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>31</Text>
		// 							</View>
		// 						</View>
		// 						<View style={{flex: 3.6, borderRightColor: "red", borderRightWidth: 1, flexDirection: "row"}}>
		// 							<View style={{flex: 3.2, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>4</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}></Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}></Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}></Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}></Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>3</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>3</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>5</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>6</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>5</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>3</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center"}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>3</Text>
		// 							</View>
		// 						</View>
		// 						<View style={{flex: 3, flexDirection: "row"}}>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}></Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}></Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}></Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}></Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>3</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>3</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>5</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>6</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>5</Text>
		// 							</View>
		// 							<View style={{flex: 1, alignItems: "center"}}>
		// 								<Text style={{fontSize: 10, color: "black"}}>3</Text>
		// 							</View>
		// 						</View>
		// 					</View>
		// 				</View>
		// 				<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
		// 					<Text style={{fontSize: 10, color: "black"}}>~비고~</Text>
		// 				</View>
		// 			</View>
		// 			<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>월</Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>일</Text>
		// 				</View>
		// 				<View style={{flex: 5, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>품목</Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>규격</Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>수량</Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>단가</Text>
		// 				</View>
		// 				<View style={{flex: 4, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>공급가액</Text>
		// 				</View>
		// 				<View style={{flex: 2.8, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>세액</Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>비고</Text>
		// 				</View>
		// 			</View>
		// 			<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}>8</Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}>31</Text>
		// 				</View>
		// 				<View style={{flex: 5, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}>8월 운송료</Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 4, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}>3,356,533</Text>
		// 				</View>
		// 				<View style={{flex: 2.8, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}>335,653</Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 			</View>
		// 			<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 5, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 4, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 2.8, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 			</View>
		// 			<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 5, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 4, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 2.8, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 			</View>
		// 			<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 5, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 4, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 2.8, alignItems: "center", justifyContent: "center", borderRightColor: "red", borderRightWidth: 1}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 				<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
		// 					<Text style={{fontSize: 10, color: "black"}}></Text>
		// 				</View>
		// 			</View>
		// 			<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 				<View style={{flex: 12.7, borderRightColor: "red", borderRightWidth: 1}}>
		// 					<View style={{flexDirection: "row"}}>
		// 						<View style={{flex: 4, borderRightColor: "red", borderRightWidth: 1, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "red"}}>합계금액</Text>
		// 						</View>
		// 						<View style={{flex: 3, borderRightColor: "red", borderRightWidth: 1, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "red"}}>현금</Text>
		// 						</View>
		// 						<View style={{flex: 3, borderRightColor: "red", borderRightWidth: 1, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "red"}}>수표</Text>
		// 						</View>
		// 						<View style={{flex: 3, borderRightColor: "red", borderRightWidth: 1, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "red"}}>어음</Text>
		// 						</View>
		// 						<View style={{flex: 3, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "red"}}>외상미수금</Text>
		// 						</View>
		// 					</View>
		// 					<View style={{flexDirection: "row", borderTopColor: "red", borderTopWidth: 1}}>
		// 						<View style={{flex: 4, borderRightColor: "red", borderRightWidth: 1, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "black"}}>3,692,186</Text>
		// 						</View>
		// 						<View style={{flex: 3, borderRightColor: "red", borderRightWidth: 1, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "black"}}>-</Text>
		// 						</View>
		// 						<View style={{flex: 3, borderRightColor: "red", borderRightWidth: 1, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "black"}}>-</Text>
		// 						</View>
		// 						<View style={{flex: 3, borderRightColor: "red", borderRightWidth: 1, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "black"}}>-</Text>
		// 						</View>
		// 						<View style={{flex: 3, alignItems: "center"}}>
		// 							<Text style={{fontSize: 10, color: "black"}}>-</Text>
		// 						</View>
		// 					</View>
		// 				</View>
		// 				<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>이 금액을</Text>
		// 				</View>
		// 				<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>영수</Text>
		// 					<Text style={{fontSize: 10, color: "red"}}>청구</Text>
		// 				</View>
		// 				<View style={{flex: 0, justifyContent: "center", alignItems: "center"}}>
		// 					<Text style={{fontSize: 10, color: "red"}}>함</Text>
		// 				</View>
		// 			</View>
		// 		</View>
		// 	</View>
		// 	<View style={{marginTop: 20}}>
		// 		<TouchableOpacity>
		// 			<View style={{flexDirection: "row", backgroundColor: "#3e50b4", justifyContent: "center", alignItems: "center", paddingVertical: 20, borderRadius: 10}}>
		// 				<Text style={{marginRight: 5, color: "white", fontSize: 20}}>다운로드</Text>
		// 				<Image source={require("../../assets/img/icon_download.png")} />
		// 			</View>
		// 		</TouchableOpacity>
		// 	</View>
		// </View>
	);
};

export default ({navigation, route}) => {
	return (
		<>
			<TaxBillDetailStacks.Navigator>
				<TaxBillDetailStacks.Screen
					name="TaxBillDetail"
					component={TaxBillDetail}
					options={{
						title: "세금계산서",
						headerStyle: {
							backgroundColor: "#3e50b4",
						},
						headerTitleStyle: {
							textAlign: "center",
							marginLeft: -44,
							paddingLeft: 0,
							fontSize: 24,
							color: "white",
						},
						headerTintColor: "white",
						headerBackTitleVisible: false,
						headerShown: true,
					}}
				></TaxBillDetailStacks.Screen>
			</TaxBillDetailStacks.Navigator>
		</>
	);
};
