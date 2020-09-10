import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { trimText, formatDate, code } from "../utils";
import { useIsModal, useSetIsModalProp } from "../ModalContext";

const Container = styled.View`
	flex: 0;
	/*padding: 0px 30px;*/
	margin-bottom: 25px;
`;

const Data = styled.View`
	align-items: flex-start;
	border-width: 1px;
	padding: 15px;
	margin: 5px;
`;

const CarrierNm = styled.Text`
	flex: 1;
	text-align: left;
	font-size: 20px;
`;
const OpratSctn = styled.Text`
	flex: 1;
	text-align: left;
	font-size: 20px;
`;

const RcritType = styled.Text`
	text-align: right;
	align-self: flex-end;
	padding-right: 10px;
`;

const TransProgress = styled.View`
	width: 100%;
	padding-horizontal: 15px;
	justify-content: space-between;
	flex-direction: row;
	font-size: 18px;
`;

const WorkingArea = styled.Text`
	flex: 1;
	text-align: left;
`;

const TonType = styled.Text`
	text-align: left;
`;
const CarType = styled.Text`
	text-align: left;
	padding-left: 5px;
`;
const DlvyPrdlst = styled.Text`
	flex: 1;
	text-align: left;
`;
const PayAmt = styled.Text`
	flex: 1;
	text-align: right;
	font-size: 20px;
`;
const PayFullType = styled.Text`
	padding-left: 5px;
	font-size: 20px;
`;

const DataHeader = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 5px;
`;

const DataBody = styled.View`
	flex: 1;
	flex-direction: column;
`;

const DataBottom = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	margin-top: 5px;
`;

const CarInfo = styled.View`
	flex: 1;
	flex-direction: row;
`;
const PayInfo = styled.View`
	flex: 1;
	flex-direction: row;
`;

const DataBottomBtn = styled.TouchableOpacity`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: #3e50b4;
	border-color: white;
	height: 50px;
`;

const Horizontal = ({
	id,
	opratSctn,
	rcritType,
	workingArea,
	carTypes,
	tonType,
	dlvyPrdlst,
	payAmt,
	payFullType,
	goToTransDetail,
	tmpKey,
}) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity disabled={useIsModal()} style={{ width: "100%" }} onPress={goToTransDetail}>
			<Container>
				<RcritType>{rcritType}</RcritType>
				<Data>
					<DataHeader>
						<CarrierNm>팀프레시</CarrierNm>
						<PayInfo>
							<PayAmt>{payAmt}</PayAmt>
							<PayFullType>{payFullType}</PayFullType>
						</PayInfo>
					</DataHeader>
					<DataBody>
						<OpratSctn>{opratSctn}</OpratSctn>
						<WorkingArea>{workingArea?.split(" ").slice(0, 2).join(" ")} 배송</WorkingArea>
					</DataBody>

					<DataBottom>
						{tmpKey == 3 ? (
							<>
								<DataBottomBtn
									onPress={() => {
										navigation.navigate("DtStmn", {
											tmpKey,
										});
									}}
								>
									<Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>명세서</Text>
								</DataBottomBtn>
								<DataBottomBtn
									onPress={() => {
										navigation.navigate("TaxInvoice", {
											mgtKey: "7a7a2bg97o2w8oei93j5d18n",
											tmpKey,
										});
									}}
								>
									<Text style={{ fontSize: 16, color: "white" }}>세금계산서</Text>
								</DataBottomBtn>
							</>
						) : tmpKey == 1 ? (
							<>
								<DataBottomBtn
									activeOpacity={1}
									onPress={() => {
										navigation.navigate("DtStmn", {
											tmpKey,
										});
									}}
								>
									<Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>명세서</Text>
								</DataBottomBtn>
								<DataBottomBtn activeOpacity={1} style={{ backgroundColor: "#E4E4E4" }} onPress={() => {}}>
									<Text style={{ fontSize: 16, color: "#606060", fontWeight: "bold" }}>세금계산서</Text>
								</DataBottomBtn>
							</>
						) : tmpKey == 2 ? (
							<>
								<DataBottomBtn activeOpacity={1} style={{ backgroundColor: "#E4E4E4" }} onPress={() => {}}>
									<Text style={{ fontSize: 16, color: "#606060", fontWeight: "bold" }}>명세서</Text>
								</DataBottomBtn>
								<DataBottomBtn activeOpacity={1} style={{ backgroundColor: "#E4E4E4" }} onPress={() => {}}>
									<Text style={{ fontSize: 16, color: "#606060", fontWeight: "bold" }}>세금계산서</Text>
								</DataBottomBtn>
							</>
						) : (
							<>
								<DataBottomBtn activeOpacity={1} style={{ backgroundColor: "#3a99fc" }} onPress={goToTransDetail}>
									<Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>운송요청보기</Text>
								</DataBottomBtn>
							</>
						)}
					</DataBottom>
				</Data>
				<TransProgress>
					{tmpKey == 3 ? (
						<>
							<Text style={{ textAlignVertical: "center" }}>
								명세서 <Entypo name="chevron-with-circle-down" size={18} color="#3a99fc" />{" "}
							</Text>
							<Text>
								<Entypo name="dot-single" size={18} color="#3a99fc" /> <Entypo name="dot-single" size={18} color="#3a99fc" />{" "}
								<Entypo name="dot-single" size={18} color="#3a99fc" />{" "}
							</Text>
							<Text style={{ textAlignVertical: "center" }}>
								세금계산서 <Entypo name="chevron-with-circle-down" size={18} color="#3a99fc" />{" "}
							</Text>
							<Text>
								<Entypo name="dot-single" size={18} color="black" /> <Entypo name="dot-single" size={18} color="black" />{" "}
								<Entypo name="dot-single" size={18} color="black" />{" "}
							</Text>
							<Text style={{ textAlignVertical: "center" }}>
								입금대기 <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
							</Text>
						</>
					) : tmpKey == 2 ? (
						<>
							<Text style={{ textAlignVertical: "center" }}>
								명세서 <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
							</Text>
							<Text>
								<Entypo name="dot-single" size={18} color="black" /> <Entypo name="dot-single" size={18} color="black" />{" "}
								<Entypo name="dot-single" size={18} color="black" />{" "}
							</Text>
							<Text style={{ textAlignVertical: "center" }}>
								세금계산서 <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
							</Text>
							<Text>
								<Entypo name="dot-single" size={18} color="black" /> <Entypo name="dot-single" size={18} color="black" />{" "}
								<Entypo name="dot-single" size={18} color="black" />{" "}
							</Text>
							<Text style={{ textAlignVertical: "center" }}>
								입금대기 <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
							</Text>
						</>
					) : tmpKey == 1 ? (
						<>
							<Text style={{ textAlignVertical: "center" }}>
								명세서 <Entypo name="chevron-with-circle-down" size={18} color="#3a99fc" />{" "}
							</Text>
							<Text>
								<Entypo name="dot-single" size={18} color="black" /> <Entypo name="dot-single" size={18} color="black" />{" "}
								<Entypo name="dot-single" size={18} color="black" />{" "}
							</Text>
							<Text style={{ textAlignVertical: "center" }}>
								세금계산서 <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
							</Text>
							<Text>
								<Entypo name="dot-single" size={18} color="black" /> <Entypo name="dot-single" size={18} color="black" />{" "}
								<Entypo name="dot-single" size={18} color="black" />{" "}
							</Text>
							<Text style={{ textAlignVertical: "center" }}>
								입금대기 <Entypo name="chevron-with-circle-down" size={18} color="black" />{" "}
							</Text>
						</>
					) : null}
				</TransProgress>
			</Container>
		</TouchableOpacity>
	);
};

Horizontal.propTypes = {
	tmpKey: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired,
	opratSctn: PropTypes.string.isRequired,
	workingArea: PropTypes.string.isRequired,
	rcritType: PropTypes.string.isRequired,
	carTypes: PropTypes.array.isRequired,
	tonType: PropTypes.string.isRequired,
	dlvyPrdlst: PropTypes.string.isRequired,
	payAmt: PropTypes.string.isRequired,
	payFullType: PropTypes.string.isRequired,
};
export default Horizontal;
