import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import {useGetUserRegistInfo} from "../../UserRegistContext";

const radioProps = [
	{label: "동의", value: true},
	{label: "철회", value: false},
];

export default (props) => {
	const agree1Ref = React.useRef();
	const agree2Ref = React.useRef();

	React.useEffect(() => {
		fetchData();
	}, []);

	const [inputs, setInputs] = React.useState();
	const [isMutate, setIsMutate] = React.useState(false);

	const getUserRegistInfo = useGetUserRegistInfo();

	const fetchData = async () => {
		const data = await getUserRegistInfo();
		setInputs(data);
		const key = data.userHPAuthAgree === "Y" ? 0 : 1;
		agree1Ref.current.updateIsActiveIndex(key);
		agree2Ref.current.updateIsActiveIndex(key);
	};

	const [agreement1, setAgreement1] = React.useState(null);
	const [agreement2, setAgreement2] = React.useState(null);

	const [merchantUid, setMerchantUid] = React.useState(`mid_${new Date().getTime()}`);
	const [company, setCompany] = React.useState("용차블루");
	const [tierCode, setTierCode] = React.useState(undefined);

	// const requestPHAuthNumber = React.useCallback(async () => {
	// 	const data = inputs;
	// 	const params = {
	// 		merchant_uid: merchantUid,
	// 	};
	// 	if (company) {
	// 		params.company = company;
	// 	}
	// 	if (data?.userNm) {
	// 		params.name = data?.userNm;
	// 	}
	// 	if (data?.userPHNumber) {
	// 		params.phone = data.userPHNumber;
	// 	}
	// 	// const result = await trigger("userPHNumber");
	// 	// if (result) {
	// 	props.navigation.navigate("PhoneCertificate", {params, tierCode});
	// 	// }
	// }, [inputs, merchantUid, company, tierCode]);

	return (
		<View style={{paddingTop: 30, paddingHorizontal: 20, flex: 1}}>
			<View style={{flexDirection: "row", marginBottom: 20}}>
				<View style={{flex: 1}}>
					<Text style={{color: "black", fontSize: 20}}>이름</Text>
				</View>
				<View style={{flex: 2}}>
					<Text style={{color: "black", fontSize: 20}}>{inputs?.userNm || "-"}</Text>
				</View>
			</View>
			<View style={{flexDirection: "row", marginBottom: 20}}>
				<View style={{flex: 2, justifyContent: "flex-start"}}>
					<Text style={{color: "black", fontSize: 20}}>휴대폰번호</Text>
				</View>
				<View style={{flex: 4}}>
					<Text style={{color: "black", fontSize: 20}}>{inputs?.userPHNumber || "-"}</Text>
				</View>
				{/* <TouchableOpacity
					onPress={() => {}}
					style={{flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "grey", borderRadius: 10}}
					disabled={!isMutate}
				>
					<Text style={{color: isMutate ? "black" : "grey", borderColor: isMutate ? "black" : "grey"}}>본인인증</Text>
				</TouchableOpacity> */}
			</View>
			<View style={{flexDirection: "row", marginBottom: 20}}>
				<View style={{flex: 1}}>
					<Text style={{color: "black", fontSize: 20}}>생년월일</Text>
				</View>
				<View style={{flex: 2}}>
					<Text style={{color: "black", fontSize: 20}}>{inputs?.userBirthDate || "-"}</Text>
				</View>
			</View>
			<View style={{flexDirection: "row", marginBottom: 20}}>
				<View style={{flex: 1}}>
					<Text style={{color: "black", fontSize: 20}}>성별</Text>
				</View>
				<View style={{flex: 2}}>
					<Text style={{color: "black", fontSize: 20}}>{inputs?.userSex === "1" ? "남" : "여" || "-"}</Text>
				</View>
			</View>
			<View style={{marginTop: 40, marginBottom: 20}}>
				<Text style={{color: "black", fontSize: 20}}>약관 동의 내역</Text>
			</View>
			<View style={{flexDirection: "row", marginBottom: 20}}>
				<View style={{flex: 1}}>
					<Text style={{color: "grey", fontSize: 15}}>약관1(필수)</Text>
				</View>
				<View style={{flex: 2}}>
					<RadioForm
						ref={agree1Ref}
						onPress={(bool) => setAgreement1(bool)}
						radio_props={radioProps}
						initial={-1}
						buttonColor={!isMutate ? "grey" : "#2196f3"}
						formHorizontal={true}
						labelStyle={{marginRight: 40}}
						disabled={!isMutate}
					/>
				</View>
			</View>
			<View style={{flexDirection: "row", marginBottom: 20}}>
				<View style={{flex: 1}}>
					<Text style={{color: "grey", fontSize: 15}}>약관2(필수)</Text>
				</View>
				<View style={{flex: 2}}>
					<RadioForm
						ref={agree2Ref}
						onPress={(bool) => setAgreement2(bool)}
						radio_props={radioProps}
						initial={-1}
						buttonColor={!isMutate ? "grey" : "#2196f3"}
						formHorizontal={true}
						labelStyle={{marginRight: 40}}
						disabled={!isMutate}
					/>
				</View>
			</View>
			{/* <View style={{flex: 1, justifyContent: "flex-end", marginBottom: 20}}>
				<TouchableOpacity
					onPress={() => {
						setIsMutate(!isMutate);
					}}
					style={{justifyContent: "center", alignItems: "center", backgroundColor: "#3e50b4", borderRadius: 7, height: 50}}
				>
					<Text style={{color: "white", fontSize: 20}}>{isMutate ? "저장" : "수정"}</Text>
				</TouchableOpacity>
			</View> */}
		</View>
	);
};
