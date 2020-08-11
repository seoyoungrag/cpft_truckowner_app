import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const DataBodyRow = styled.View`
 flex: 1;
 flex-direction: row;
 padding-left: 15px;
 align-items: center;
 margin-bottom: 35px;
`;

const DataBodyTitle = styled.View`
 width: 100px;
 padding-right: 15px;
`;

const DataBodyTitleText = styled.Text`
 font-size: 18px;
`;

const DataBodyContent = styled.View`
 padding-right: 15px;
`;

const DataBodyContentText = styled.Text`
 font-size: 17px;
`;

const Horizontal = ({ title, content }) => {
 return (
  <DataBodyRow>
   <DataBodyTitle>
    <DataBodyTitleText>{title}</DataBodyTitleText>
   </DataBodyTitle>
   <DataBodyContent>
    <DataBodyContentText>{content}</DataBodyContentText>
   </DataBodyContent>
  </DataBodyRow>
 );
};

Horizontal.propTypes = {
 title: PropTypes.string.isRequired,
 content: PropTypes.string.isRequired,
};
export default Horizontal;
