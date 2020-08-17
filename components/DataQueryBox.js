import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text } from "react-native";

const DataQueryContainer = styled.View`
 width: 100%;
 padding-left: 10px;
 padding-right: 10px;
`;

const DataQuery = styled.View`
 flex-direction: row;
 justify-content: space-between;
`;

const DataQueryReply = styled.View`
 width: 100%;
 padding-left: 20px;
`;

const DataQueryBox = ({ title, date, reply }) => {
 return (
  <DataQueryContainer>
   <DataQuery>
    <Text>{title}</Text>
    <Text>{date}</Text>
   </DataQuery>
   <DataQueryReply>
    <Text>{reply}</Text>
   </DataQueryReply>
  </DataQueryContainer>
 );
};

DataQueryBox.propTypes = {
 title: PropTypes.string.isRequired,
 date: PropTypes.string.isRequired,
 reply: PropTypes.string.isRequired,
};
export default DataQueryBox;
