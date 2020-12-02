import React from "react";
import {View, Text, Image} from "react-native";
import * as rq from "react-query";
import * as Calc from "../../components/Calc";
import axios from "axios";
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from "accordion-collapse-react-native";
import {useToken} from "../../AuthContext";
import ScrollContainer from "../../components/ScrollContainer";
import Empty from "../../components/Empty";
import ErrorText from "../../components/ErrorText";

export default (props) => {
	const [status, setStatus] = React.useState();

	const token = useToken();

	const url = "https://blueapi.teamfresh.co.kr/v2/notice/getNoticeList";
	// const url = "http://172.126.11.154:19201/v2/notice/getNoticeList";

	const dataInfo = rq.useQuery(
		"getNoticeList",
		async () => {
			return await axios.post(
				url,
				{
					userSeq: 1,
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
			onSuccess: (data) => {
				const length = data.data.list.length;
				const obj = {};
				for (let i = 0; i < length; i++) {
					obj["isOpen" + (i + 1)] = false;
				}
				setStatus(obj);
			},
			onError: (error) => {},
		}
	);

	return (
		<ScrollContainer
			loading={dataInfo?.isLoading}
			refreshOn={true}
			refreshFn={() => {
				rq.queryCache.invalidateQueries("getNoticeList");
			}}
		>
			<View style={{flex: 1, padding: 20}}>
				<View style={{paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 10}}>
					{dataInfo?.status === "success" && dataInfo?.data?.data?.list?.length > 0 ? (
						dataInfo?.data?.data?.list?.map((data, index) => (
							<View style={{backgroundColor: "white"}}>
								<Collapse key={index} onToggle={(bool) => setStatus((prevStatus) => ({...prevStatus, ["isOpen" + (index + 1)]: bool}))}>
									<CollapseHeader>
										<View style={{flexDirection: "row", marginVertical: 10, paddingBottom: 20, borderBottomColor: "#efefef", borderBottomWidth: 1}}>
											<View style={{flex: 1}}>
												<Text style={{fontSize: 16}}>{Calc.getDateMark(new Date(data.createdAt)) || "-"}</Text>
											</View>
											<View style={{flex: 2.5}}>
												<Text style={{fontSize: 16, color: "black"}}>{data.title.length > 15 ? data.title.substring(0, 15) + "..." : data.title}</Text>
											</View>
											{status && status["isOpen" + (index + 1)] ? (
												<Image source={require("../../assets/img/icon_arrow_up.png")} />
											) : (
												<Image source={require("../../assets/img/icon_arrow_down.png")} />
											)}
										</View>
									</CollapseHeader>
									<CollapseBody>
										<View style={{backgroundColor: "#fafafa", paddingVertical: 10, borderBottomColor: "#efefef", borderBottomWidth: 1, marginBottom: 20}}>
											<Text style={{fontSize: 14}}>{data.content}</Text>
										</View>
									</CollapseBody>
								</Collapse>
							</View>
						))
					) : (
						<Empty />
					)}
					{dataInfo?.status === "error" && <ErrorText />}
				</View>
			</View>
		</ScrollContainer>
	);
};
