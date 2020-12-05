import React from "react";
import {Image, Dimensions, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {AntDesign} from "@expo/vector-icons";
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

export default ({navigation}) => {
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
					<ModalHeaderTitle>개인정보 취급방침</ModalHeaderTitle>
				</ModalHeader>
				<ScrollContainer
					loading={false}
					contentContainerStyle={{paddingBottom: 0, marginBottom: 0, backgroundColor: "transparent", marginTop: 0, paddingTop: 0}}
					refreshOn={false}
				>
				<Image source={require("../../assets/img/serviceTerms/terms01.png")} />
				<Image source={require("../../assets/img/serviceTerms/terms02.png")} />
				<Image source={require("../../assets/img/serviceTerms/terms03.png")} />
				<Image source={require("../../assets/img/serviceTerms/terms04.png")} />
				<Image source={require("../../assets/img/serviceTerms/terms05.png")} />
				<Image source={require("../../assets/img/serviceTerms/terms06.png")} />
				<Image source={require("../../assets/img/serviceTerms/terms07.png")} />
				<Image source={require("../../assets/img/serviceTerms/terms08.png")} />
				<Image source={require("../../assets/img/serviceTerms/terms09.png")} />
				<Image source={require("../../assets/img/serviceTerms/terms10.png")} />
				</ScrollContainer>
			</Modal>
		</OuterContainer>
	);
};
