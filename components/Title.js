import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Text = styled.Text`
 color: black;
 font-weight: bold;
 font-size: 24px;
 margin-top: 15px;
 margin-left: 15px;
`;

const Title = ({ title }) => <Text>{title}</Text>;

Title.propTypes = {
 title: PropTypes.string.isRequired,
};

export default Title;
