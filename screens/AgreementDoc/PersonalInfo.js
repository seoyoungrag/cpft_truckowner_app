import React from "react";
import {View, Text, Image, ScrollView} from "react-native";

export default () => {
	return (
		<ScrollView>
			<View>
				<Image source={require("../../assets/img/personalTerms/terms01.png")} />
				<Image source={require("../../assets/img/personalTerms/terms02.png")} />
				<Image source={require("../../assets/img/personalTerms/terms03.png")} />
				<Image source={require("../../assets/img/personalTerms/terms04.png")} />
				<Image source={require("../../assets/img/personalTerms/terms05.png")} />
				<Image source={require("../../assets/img/personalTerms/terms06.png")} />
			</View>
		</ScrollView>
	);
};
