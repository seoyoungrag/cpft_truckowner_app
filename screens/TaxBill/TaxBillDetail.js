import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {Table, Row, TableWrapper, Cell} from "react-native-table-component";
import {WebView} from "react-native-webview";
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from "react-native-fs";

const TaxBillDetailStacks = createStackNavigator();

const TaxBillDetail = ({navigation, route}) => {
	const taxBillSeq = route.params.taxBillSeq;
	const targetMonth = new Date(route.params.targetMonth);

	const url = "http://172.126.11.154:3000/forApp/TaxBillDetailForApp?taxBillSeq=" + taxBillSeq + "&targetMonth=" + targetMonth;

	const viewRef = React.useRef();
	const [source, setSource] = React.useState(null);

	const onDownloadBtn = React.useCallback(() => {
		let imageData = source.dataUrl.split("data:image/png;base64,");
		imageData = imageData[1];

		const filePath = `${RNFS.DocumentDirectoryPath}`;
		console.log("오", filePath);

		RNFS.writeFile(filePath + "/세금계산서.png", imageData, "base64")
			.then((success) => {
				console.log("성공");
			})
			.catch((err) => {
				console.log("실패");
			});
		// const result = await CameraRoll.save(file);
	}, [source]);

	/** 웹뷰에서 rn으로 값을 보낼때 거치는 함수 */
	const handleOnMessage = ({nativeEvent: {data}}) => {
		// data에 웹뷰에서 보낸 값이 들어옵니다.
		setSource(JSON.parse(data));
	};

	return (
		<>
			<WebView
				ref={viewRef}
				onMessage={handleOnMessage}
				source={{uri: url}}
				// injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
			></WebView>
			{source && (
				<View>
					<TouchableOpacity onPress={onDownloadBtn}>
						<View style={{flexDirection: "row", backgroundColor: "#3e50b4", justifyContent: "center", alignItems: "center", paddingVertical: 20}}>
							<Text style={{marginRight: 5, color: "white", fontSize: 20}}>다운로드</Text>
							<Image source={require("../../assets/img/icon_download.png")} />
						</View>
					</TouchableOpacity>
				</View>
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
