import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { trimText, formatDate } from "../utils";

const Container = styled.View`
 flex: 1;
 padding: 0px 30px;
 margin-bottom: 30px;
 align-items: flex-start;
`;

const Data = styled.View`
 flex: 1;
 align-items: flex-start;
 margin-left: 25px;
 border-width: 1px;
`;

const Title = styled.Text`
 color: white;
 font-weight: bold;
 margin-bottom: 10px;
`;

const ReleaseDate = styled.Text`
 color: white;
 font-size: 12px;
 margin-bottom: 10px;
`;

const Overview = styled.Text`
 margin-top: 10px;
 color: white;
`;
const Horizontal = ({
 id,
 opratSctn,
 workingArea,
 carTypes,
 tonType,
 dlvyPrdlst,
 payAmt,
 payFullType,
}) => {
 const navigation = useNavigation();
 const goToDetail = () => {
  navigation.navigate("Detail", {
   isTv,
   id,
   title,
   poster,
   overview,
   releaseDate,
  });
 };
 return (
  <TouchableOpacity style={{ width: "100%" }} onPress={goToDetail}>
   <Container>
    <Data>
     <Text>{opratSctn}</Text>
     <Text>{workingArea}</Text>
     <Text>{carTypes}</Text>
     <Text>{tonType}</Text>
     <Text>{dlvyPrdlst}</Text>
     <Text>{payAmt}</Text>
     <Text>{payFullType}</Text>
    </Data>
   </Container>
  </TouchableOpacity>
 );
};

Horizontal.propTypes = {
 id: PropTypes.string.isRequired,
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
