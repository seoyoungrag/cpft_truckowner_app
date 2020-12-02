import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import * as rq from "react-query";
import axios from "axios";
import ScrollContainer from "../../components/ScrollContainer";
import {useNavigation} from "@react-navigation/native";
import DtsmnRow from "./DtsmnRow";
import {Entypo} from "@expo/vector-icons";
import {useToken} from "../../AuthContext";
import Empty from "../../components/Empty";
import ErrorText from "../../components/ErrorText";

export default (props) => {
	const navigation = useNavigation();

	const [targetYear, setTargetYear] = React.useState(new Date().getFullYear());
	const targetYearRef = React.useRef();

	React.useEffect(() => {
		targetYearRef.current = targetYear;
		rq.queryCache.invalidateQueries("getMyDtstmnList");
	}, [targetYear]);

	rq.setConsole({
		log: console.log,
		warn: console.warn,
		error: console.warn,
	});

	const token = useToken();

	const url = "https://blueapi.teamfresh.co.kr/v2/trans/getTransList";
	// const url = "http://172.126.11.154:19201/v2/trans/getTransList";

	const dataInfo = rq.useQuery(
		"getMyDtstmnList",
		async () => {
			return await axios.post(
				url,
				{
					targetYear: targetYearRef.current,
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
			retry: 0,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {},
			onError: (error) => {},
		}
	);

	return (
		<>
			<View style={{height: 56, backgroundColor: "#3e50b4", flexDirection: "row"}}>
				<TouchableOpacity
					onPress={() => {
						navigation.pop();
					}}
					style={{flex: 1, paddingLeft: 15, justifyContent: "center", borderRadius: 40}}
				>
					<Entypo name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<View style={{flex: 9, alignItems: "center", justifyContent: "center", paddingRight: 40, flexDirection: "row"}}>
					<TouchableOpacity
						onPress={() => {
							setTargetYear(targetYear - 1);
						}}
						style={{marginRight: 20}}
					>
						<Entypo name="triangle-left" size={24} color="white" />
					</TouchableOpacity>
					<View>
						<Text style={{color: "white", fontSize: 24}}>{targetYear}년</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							setTargetYear(targetYear + 1);
						}}
						style={{marginLeft: 20}}
					>
						<Entypo name="triangle-right" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollContainer
				loading={dataInfo?.isLoading}
				contentContainerStyle={{paddingTop: 20, backgroundColor: "white"}}
				refreshOn={true}
				refreshFn={() => {
					rq.queryCache.invalidateQueries("getMyDtstmnList");
				}}
			>
				<View style={{paddingHorizontal: 20, flex: 1}}>
					<View style={{flexDirection: "row", borderBottomWidth: 3, borderBottomColor: "#efefef", paddingBottom: 20, justifyContent: "space-around"}}>
						<View>
							<Text style={{color: "black", fontWeight: "bold", fontSize: 15}}>운송날짜</Text>
						</View>
						<View>
							<Text style={{color: "black", fontWeight: "bold", fontSize: 15}}>화주사</Text>
						</View>
						<View>
							<Text style={{color: "black", fontWeight: "bold", fontSize: 15}}>명세서</Text>
						</View>
					</View>
					{dataInfo?.status === "success" &&
						(dataInfo?.data?.data?.list?.length > 0 ? dataInfo?.data?.data?.list?.map((data, index) => <DtsmnRow key={index} data={data} />) : <Empty />)}
					{dataInfo?.status === "error" && <ErrorText />}
				</View>
			</ScrollContainer>
		</>
	);
};
