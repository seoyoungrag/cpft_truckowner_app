import React, {useState} from "react";
import {Dimensions, StatusBar} from "react-native";
import styled from "styled-components/native";
import TutorialPresenter from "./TutorialPresenter";
import ScrollContainer from "../../components/ScrollContainer";
import {useTutorialPass} from "../../TutorialContext";
import snapshot1 from "../../assets/snapshot1.png";
import snapshot2 from "../../assets/snapshot2.png";
import snapshot3 from "../../assets/snapshot3.png";

const ModalFooter = styled.View`
	position: absolute;
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

const OuterContainer = styled.SafeAreaView`
	flex: 1;
	background-color: white;
`;

export default () => {
	const [data, setData] = useState([
		{
			image: snapshot1,
			desc: "운송료 명세서를 받으세요.",
		},
		{
			image: snapshot2,
			desc: "수기 세금계산서를 확인하세요.",
		},
		{
			image: snapshot3,
			desc: "월 별 정산 내역을 확인하세요.",
		},
	]);
	const tutorialPass = useTutorialPass();
	const onClickStart = () => {
		tutorialPass();
	};
	const screenWidth = Math.round(Dimensions.get("window").width);
	const screenHeight = Math.round(Dimensions.get("window").height);
	return (
		<OuterContainer>
			<StatusBar barStyle="dark-content" backgroundColor="white" />
			<ScrollContainer
				loading={false}
				contentContainerStyle={{
					paddingBottom: 80,
					backgroundColor: "transparent",
					marginTop: 20,
					paddingTop: 20,
				}}
				refreshOn={false}
			>
				<TutorialPresenter
					data={data}
					imageKey={"image"}
					local={true}
					width={screenWidth}
					height={screenHeight - 250}
					separator={0}
					timer={3000}
					loop={true}
					autoscroll={true}
					//currentIndexCallback={(index) => console.log("Index", index)}
					//onPress={onClickStart}
					indicator
					animation
				/>
			</ScrollContainer>

			<ModalFooter>
				<ConfirmBtn onPress={onClickStart}>
					<ConfirmBtnText>시작하기</ConfirmBtnText>
				</ConfirmBtn>
			</ModalFooter>
		</OuterContainer>
	);
};
