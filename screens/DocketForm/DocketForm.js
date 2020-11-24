import React from "react";
import {View, Text} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {FontAwesome5, Entypo} from "@expo/vector-icons";
import ScrollContainer from "../../components/ScrollContainer";
import {useIsModal} from "../../ModalContext";

import TsBasic from "../DocketForm/TsBasic";
import LfBasic from "../DocketForm/LfBasic";
import LfEdiya from "../DocketForm/LfEdiya";
import DailyWork from "../DocketForm/DailyWork";

const DocketFormStacks = createStackNavigator();
const DocketFormNav = createStackNavigator();

const DocketFormContainer = ({navigation, route}) => {
	return (
		<DocketFormNav.Navigator>
			<DocketFormNav.Screen name="TS 기본" component={TsBasic} />
			<DocketFormNav.Screen name="LF 기본" component={LfBasic} />
			<DocketFormNav.Screen name="LF 이디야" component={LfEdiya} />
			<DocketFormNav.Screen name="용차" component={DailyWork} />
		</DocketFormNav.Navigator>
	);
};

export default ({navigation, route}) => {
	return (
		<>
			<DocketFormStacks.Navigator>
				<DocketFormStacks.Screen
					name="DocketFormContainer"
					component={DocketFormContainer}
					options={{
						title: "명세서",
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
				></DocketFormStacks.Screen>
			</DocketFormStacks.Navigator>
		</>
	);
};
