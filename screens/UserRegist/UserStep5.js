import React, {useState, useEffect} from "react";
import {Dimensions, TouchableOpacity, Button} from "react-native";
import styled from "styled-components/native";
import {useLogIn} from "../../AuthContext";
import {useGetUserRegistInfo, useSetUserRegistInfo} from "../../UserRegistContext";
import ScrollContainer from "../../components/ScrollContainer";
import * as rq from "react-query";
import axios from "axios";
import messaging from "@react-native-firebase/messaging";
import jwt from "jwt-decode";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const OuterContainer = styled.SafeAreaView`
	flex: 1;
`;

const Modal = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: white;
`;

const ModalHeader = styled.View`
	padding-left: 20px;
	padding-right: 20px;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
`;
const ModalHeaderTitle = styled.Text`
	color: #303030;
	font-size: 16px;
`;

const ModalFooter = styled.View`
	bottom: 0px;
	left: 0px;
	right: 0px;
	height: 50px;
	align-items: center;
`;

const ConfirmBtn = styled.TouchableOpacity`
	width: 80%;
	height: 80%;
	justify-content: center;
	background-color: #3e50b4;
	border-radius: 5px;
`;
const ConfirmBtnText = styled.Text`
	text-align: center;
	color: white;
	font-weight: bold;
	font-size: 16px;
`;

const Data = styled.View`
	margin-top: 0px;
	padding: 0px 0px;
`;
const Container = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: flex-start;
`;

const DataName = styled.Text`
	margin-top: 30px;
	color: #0d0d0d;
	opacity: 0.8;
	font-weight: bold;
	font-size: 20px;
	margin-left: 40px;
`;

const DataValue = styled.Text`
	margin-left: 40px;
	margin-right: 40px;
	color: #303030;
	opacity: 0.8;
	font-weight: 500;
	font-size: 14px;
`;

// const url = "http://172.126.11.154:19201/v2/account/insertAccount";
const url = "https://blueapi.teamfresh.co.kr/v2/account/insertAccount";

export default ({navigation}) => {
	const [insertCall] = rq.useMutation(
		(obj) => {
			return axios.post(url, obj);
		},
		{
			onSuccess: async (data) => {
				const token = data?.data?.data;
				const userInfo = jwt(token);
				const newValue = Object.assign({}, userInfo, {
					userRegistComplete: true,
				});
				await setUserRegistInfo(newValue);
				await logIn(token);
			},
			onError: (error) => {
				console.log("에러", error);
			},
		}
	);

	const logIn = useLogIn();
	const [userRegistInfo, setUserRegistInfoProp] = useState(null);
	const getUserRegistInfo = useGetUserRegistInfo();
	const setUserRegistInfo = useSetUserRegistInfo();

	const [fcmToken, setFcmToken] = React.useState(null);

	const getFcmToken = React.useCallback(async () => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			// console.log(fcmToken);
			console.log("Your Firebase Token is:", fcmToken);
			setFcmToken(fcmToken);
		} else {
			console.log("Failed", "No token received");
		}
	}, []);

	React.useEffect(() => {
		getFcmToken();
	}, []);

	const loginSuccess = React.useCallback(async () => {
		const newValue = Object.assign({}, userRegistInfo, {
			userRegistComplete: true,
		});

		try {
			// await setUserRegistInfo(newValue);
			const fcmTokenObj = {
				fcmToken: fcmToken,
			};
			await insertCall(Object.assign({}, userRegistInfo, fcmTokenObj));
		} catch (e) {
			console.log("에러", e);
		}
		//await setUserRegistInfoProp({...userRegistInfo, userRegistComplete: "Y"});
		//await setUserRegistInfo({...userRegistInfo, userRegistComplete: "Y"})
	}, [fcmToken, userRegistInfo]);

	const fetchData = async () => {
		const data = await getUserRegistInfo();
		setUserRegistInfoProp(data);
	};
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", async () => {
			await fetchData();
		});
		return unsubscribe;
	}, [navigation]);
	useEffect(() => {}, []);

	return (
		<OuterContainer>
			<Modal>
				<ModalHeader>
					<TouchableOpacity
						style={{
							width: 40,
							height: 40,
							justifyContent: "center",
						}}
					></TouchableOpacity>
					<ModalHeaderTitle>2/2</ModalHeaderTitle>
				</ModalHeader>
				<ScrollContainer
					loading={false}
					contentContainerStyle={{
						paddingBottom: 80,
						backgroundColor: "transparent",
						marginTop: 0,
						paddingTop: 0,
					}}
					refreshOn={false}
				>
					<Data style={{width: screenWidth, height: screenHeight - 100}}>
						<Container style={{flex: 1, justifyContent: "flex-start", marginTop: 0}}>
							<DataName>가입 완료</DataName>
							<DataValue>
								{/* {userRegistInfo ? JSON.stringify(userRegistInfo) : null} */}
								완료를 눌러 앱을 시작하세요!
							</DataValue>
						</Container>
					</Data>
				</ScrollContainer>

				<ModalFooter>
					<ConfirmBtn
						onPress={() => {
							loginSuccess();
						}}
					>
						<ConfirmBtnText>완료</ConfirmBtnText>
					</ConfirmBtn>
				</ModalFooter>
			</Modal>
		</OuterContainer>
	);
};
