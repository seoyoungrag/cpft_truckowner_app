import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import ScrollContainer from "../../components/ScrollContainer";

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
	margin-top: ${Constants.statusBarHeight}px;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
`;
const ModalHeaderTitle = styled.Text`
	color: black;
	font-size: 20px;
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
	color: black;
	opacity: 0.8;
	font-weight: 500;
	font-size: 16px;
	margin-left: 40px;
	margin-right: 40px;
`;

export default ({ navigation }) => {
	const goBack = () => {
		navigation.pop();
	};

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
						onPress={goBack}
					>
						<AntDesign name={"arrowleft"} color={"#303030"} size={24} />
					</TouchableOpacity>
					<ModalHeaderTitle>본인확인 통신사 이용약관</ModalHeaderTitle>
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
					<Data style={{ width: screenWidth, height: screenHeight - 100 }}>
						<Container style={{ flex: 1, justifyContent: "flex-start", marginTop: 0 }}>
							<DataName>
								여러분 제가 드디어 버그를 알아냈습니다! 이 글을 다른곳에다가 5번 옮기고 F3을 누르면 캐시창에 9999999999원이 있고 창고에
								99999999999템이 들어올것입니다 꼭 해보세요!
							</DataName>
						</Container>
					</Data>
				</ScrollContainer>
			</Modal>
		</OuterContainer>
	);
};
