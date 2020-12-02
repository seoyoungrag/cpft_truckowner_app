import React, {useState, useEffect, useRef} from "react";
import {Dimensions, Text, TouchableOpacity, Modal, View, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome5} from "@expo/vector-icons";
import ScrollContainer from "../../components/ScrollContainer";
import {useIsModal} from "../../ModalContext";
import {useCodes} from "../../CodeContext";
import {useGetUserRegistInfo} from "../../UserRegistContext";
import MonthPicker from "react-native-month-year-picker";
import * as Calc from "../../components/Calc";
import TransCard from "./TransCard";
import axios from "axios";
import * as rq from "react-query";
import Empty from "../../components/Empty";
import ErrorText from "../../components/ErrorText";
import {useToken} from "../../AuthContext";
import jwt from "jwt-decode";

const {width, height} = Dimensions.get("screen");

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
		width: width,
		height: height,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 10,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10,
		elevation: 2,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 20,
		marginRight: 20,
		marginTop: 5,
		marginBottom: 5,
	},
	modalTItle: {
		fontSize: 24,
		marginBottom: 15,
		textAlign: "center",
	},
	modalBody: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default (props) => {
	const navigation = useNavigation();
	const getUserRegistInfo = useGetUserRegistInfo();
	const [userRegistInfo, setUserRegistInfoProp] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const targetMonthRef = useRef(new Date());

	const fetchData = async () => {
		const data = await getUserRegistInfo();
		setUserRegistInfoProp(data);
	};

	const [targetDate, setTargetDate] = useState(new Date());
	const [isMonthPickerShow, setIsMonthPickerShow] = useState(false);

	const dateChange = React.useCallback(
		(e, newDate) => {
			const date = newDate || targetDate;
			setIsMonthPickerShow(false);
			setTargetDate(date);
			targetMonthRef.current = date;
			rq.queryCache.invalidateQueries("getTransList");
		},
		[targetDate]
	);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", async () => {
			if (!userRegistInfo) {
				await fetchData();
			} else {
			}
		});
		return unsubscribe;
	}, [navigation]);

	rq.setConsole({
		log: console.log,
		warn: console.warn,
		error: console.warn,
	});

	const token = useToken();

	// const url = "http://172.126.11.154:19201/v2/trans/getTransList";
	const url = "https://blueapi.teamfresh.co.kr/v2/trans/getTransList";

	const dataInfo = rq.useQuery(
		"getTransList",
		async () => {
			return await axios.post(
				url,
				{
					targetMonth: targetMonthRef.current.toISOString(),
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
			enabled: targetDate,
			retry: 0,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {},
			onError: (error) => {
				console.log("에러!!", error);
			},
		}
	);

	const refreshFn = React.useCallback(() => {
		rq.queryCache.invalidateQueries("getTransList");
	}, []);

	return (
		<>
			<Modal animationType="fade" hardwareAccelerated={true} transparent={true} statusBarTranslucent={true} visible={modalVisible}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalTItle}>보기 권한</Text>

						<Text style={styles.modalBody}>차량정보 입력한 회원만 볼 수 있습니다. {"\r\n"}마저 등록하러 가시겠습니까?</Text>
						<View style={{flexDirection: "row"}}>
							<TouchableOpacity
								style={{
									...styles.openButton,
									backgroundColor: "white",
									marginRight: 10,
								}}
								onPress={() => {
									setModalVisible(!modalVisible);
								}}
							>
								<Text style={[styles.textStyle, {color: "#2196F3"}]}>아니오</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									...styles.openButton,
									backgroundColor: "#2196F3",
								}}
								onPress={() => {
									navigation.navigate("추가정보입력", {
										isFromOrder: true,
									});
									setModalVisible(!modalVisible);
								}}
							>
								<Text style={styles.textStyle}>예</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<View>
				<View
					style={{
						alignItems: "center",
						flexDirection: "row",
						backgroundColor: "white",
						width: width,
						paddingLeft: 20,
					}}
				></View>
				<View
					style={{
						alignItems: "center",
						flexDirection: "row",
						backgroundColor: "white",
						width: width,
						paddingLeft: 20,
						paddingRight: 20,
						paddingVertical: 3,
						justifyContent: "flex-start",
						paddingTop: 15,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text style={{color: "#0d0d0d", fontSize: 24}}>{Calc.getMonthStr(targetDate)}월</Text>
						<TouchableOpacity
							onPress={() => {
								setIsMonthPickerShow(true);
							}}
						>
							<FontAwesome5 name="calendar-alt" size={24} color="#3e50b4" style={{paddingHorizontal: 20}} />
						</TouchableOpacity>
						{isMonthPickerShow && <MonthPicker minimumDate={new Date(2000, 5)} maximumDate={new Date(2025, 5)} onChange={dateChange} value={targetDate} locale="ko" />}
					</View>
				</View>
			</View>
			<ScrollContainer
				refreshOn={true}
				refreshFn={refreshFn}
				loading={dataInfo?.isLoading}
				contentContainerStyle={{
					backgroundColor: useIsModal() ? "rgba(0,0,0,0.5)" : "white",
					paddingBottom: 50,
				}}
			>
				{dataInfo?.status === "success" &&
					(dataInfo?.data?.data?.list?.length > 0 ? (
						dataInfo?.data?.data?.list?.map((data, index) => <TransCard key={index} data={data} targetMonth={targetDate} />)
					) : (
						<Empty />
					))}
				{dataInfo?.status === "error" && <ErrorText />}
			</ScrollContainer>
		</>
	);
};
