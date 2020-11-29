import React from "react";
import {View, Text, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {Table, Row, TableWrapper, Cell} from "react-native-table-component";
import {WebView} from "react-native-webview";
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from "react-native-fs";
import * as Permissions from "expo-permissions";
import * as Calc from "../../components/Calc";
import * as rq from "react-query";
import axios from "axios";
import {useToken} from "../../AuthContext";
import jwt from "jwt-decode";
import TransDetail from "./TransDetail";

const TaxBillDetailStacks = createStackNavigator();

const TaxBillDetail = ({navigation, route}) => {
	const token = useToken();

	const taxBillSeq = route.params.taxBillSeq;
	const targetMonth = route.params.targetMonth;
	const taxBillType = route.params.taxBillType;
	const businessType = route.params.businessType;
	const userSeq = jwt(token).userSeq;

	const url =
		"http://172.126.11.154:3000/forApp/TaxBillDetailForApp?taxBillSeq=" +
		taxBillSeq +
		"&targetMonth=" +
		targetMonth +
		"&taxbilType=" +
		taxBillType +
		"&businessType=" +
		businessType +
		"&userSeq=" +
		userSeq;

	console.log("주소", url);

	const viewRef = React.useRef();
	const [source, setSource] = React.useState(null);

	const onDownloadBtn = React.useCallback(() => {
		let imageData = source.dataUrl.split("data:image/png;base64,");
		imageData = imageData[1];

		const filePath = `${RNFS.DownloadDirectoryPath}`;

		//Creating folder
		if (RNFS.exists(filePath)) {
			RNFS.unlink(filePath)
				.then(() => {
					console.log("FOLDER/FILE DELETED");
				})
				// `unlink` will throw an error, if the item to unlink does not exist
				.catch((err) => {
					console.log("CANT DELETE", err.message);
				});

			RNFS.mkdir(filePath);
		}
		if (imageData) {
			RNFS.writeFile(filePath + "/세금계산서.png", imageData, "base64")
				.then((success) => {
					console.log(filePath);
					console.log("성공");
				})
				.catch((err) => {
					console.log("실패");
				});
			// const result = await CameraRoll.save(file);
		}
	}, [source]);

	/** 웹뷰에서 rn으로 값을 보낼때 거치는 함수 */
	const handleOnMessage = ({nativeEvent: {data}}) => {
		// data에 웹뷰에서 보낸 값이 들어옵니다.
		setSource(JSON.parse(data));
	};

	React.useEffect(() => {
		const askPermission = async () => {
			const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			console.log("asdfasdf", status);
		};
		askPermission();
		return askPermission;
	}, []);

	rq.setConsole({
		log: console.log,
		warn: console.warn,
		error: console.warn,
	});

	const dataInfo = rq.useQuery(
		"getTransferDetail",
		async () => {
			return await axios.post(
				"https://blueapi.teamfresh.co.kr/v2/trans/getTransferDetail",
				{
					taxBilSeq: taxBillSeq,
					targetMonth: new Date(targetMonth),
					taxbilType: taxBillType,
					driverBsnmType: businessType,
					userSeq: userSeq,
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
			refetchOnWindowFocus: false,
			enabled: taxBillType === "간이" && businessType === "간이",
			onSuccess: (data) => {},
			onError: (error) => {},
		}
	);

	// row
	// const TransDetail = (props) => {
	// 	let total = 0;
	// 	if (props.bool) {
	// 		props.array.map((data) => (total += data.transPayment));
	// 	}
	// 	let date = Calc.getDateStr(new Date(props.data.issuDate));
	// 	console.log("날짜", date);
	// 	return (
	// 		<>
	// 			<View style={{flexDirection: "row", justifyContent: "space-around", marginVertical: 5}}>
	// 				<Text style={{color: "black", fontSize: 15}}>{Calc.getDateStr(new Date(props.data.issuDate)) | "-"}</Text>
	// 				<Text style={{color: "black", fontSize: 15}}>{props.data.productList || "-"}</Text>
	// 				<Text style={{color: "black", fontSize: 15}}>{Calc.regexWON(props.data.transPayment) || "-"}원</Text>
	// 			</View>
	// 			{props.bool && (
	// 				<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
	// 					<Text>합계</Text>
	// 					<Text style={{fontWeight: "bold", color: "#3e50b4"}}>{Calc.regexWON(total) || "-"}원</Text>
	// 				</View>
	// 			)}
	// 		</>
	// 	);
	// };

	return (
		<>
			{(taxBillType === "전자" && businessType === "법인") || (taxBillType === "전자" && businessType === "일반") ? (
				<View style={{justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: "60%"}}>
					<Text style={{color: "black", fontSize: 16}}>수기 세금계산서 발행 대상자가 아닙니다.</Text>
					<Text style={{color: "black", fontSize: 16}}>전자 세금계산서 발행을 선택하셨습니다.</Text>
				</View>
			) : taxBillType === "간이" && businessType === "간이" ? (
				<View style={{padding: 20}}>
					<View style={{flexDirection: "row", justifyContent: "space-between"}}>
						<Text style={{color: "black", fontSize: 15}}>{Calc.getMonthStr(new Date(targetMonth)) || "-"}월</Text>
						<Text style={{color: "black", fontSize: 15}}>김차주 님</Text>
					</View>
					<View style={{backgroundColor: "white", marginTop: 10, padding: 15}}>
						<Text style={{color: "black", fontSize: 18, fontWeight: "bold"}}>운송료 내역</Text>
						<View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 20, borderBottomColor: "#efefef", borderBottomWidth: 2, paddingBottom: 10}}>
							<Text style={{color: "black", fontSize: 15}}>발행 날짜</Text>
							<Text style={{color: "black", fontSize: 15}}>품목</Text>
							<Text style={{color: "black", fontSize: 15}}>금액</Text>
						</View>
						{dataInfo.status === "success" &&
							dataInfo?.data?.data?.list.map((data, index, array) => (
								<TransDetail key={index} data={data} bool={index + 1 === array.length ? true : false} array={array} />
							))}
					</View>
					<View style={{marginTop: "20%", alignItems: "center"}}>
						<Text style={{color: "black", fontWeight: "black", fontSize: 16}}>위 금액을 영수함</Text>
					</View>
				</View>
			) : (
				<>
					<WebView
						ref={viewRef}
						onMessage={handleOnMessage}
						source={{
							uri: url,
						}}

						// injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
					></WebView>
					{source ? (
						<View>
							<TouchableOpacity onPress={onDownloadBtn}>
								<View style={{flexDirection: "row", backgroundColor: "#3e50b4", justifyContent: "center", alignItems: "center", paddingVertical: 20}}>
									<Text style={{marginRight: 5, color: "white", fontSize: 20}}>다운로드</Text>
									<Image source={require("../../assets/img/icon_download.png")} />
								</View>
							</TouchableOpacity>
						</View>
					) : (
						<ActivityIndicator style={{marginVertical: 20}} />
					)}
				</>
			)}
		</>
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
