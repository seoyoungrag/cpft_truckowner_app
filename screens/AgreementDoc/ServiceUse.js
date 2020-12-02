import React from "react";
import {View, Text, Image, ScrollView, Dimensions} from "react-native";

export default () => {
	return (
		<ScrollView>
			<View>
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
			</View>
		</ScrollView>
	);
};
