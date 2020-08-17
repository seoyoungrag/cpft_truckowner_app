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
 flex: 0.4;
 padding-right: 15px;
`;

const DataBodyTitleText = styled.Text`
 font-size: 18px;
`;

const DataBodyContent = styled.View`
 flex: 0.6;
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
   <DataBodyContent>{content}</DataBodyContent>
  </DataBodyRow>
 );
};

Horizontal.propTypes = {
 title: PropTypes.string.isRequired,
 content: PropTypes.object.isRequired,
};
export default Horizontal;
