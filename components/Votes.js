import React from "react";
import styled from "styled-components/native";

const Votes = styled.Text`
 color: rgb(220, 220, 220);
 margin-bottom: 7px;
 font-weight: 500;
 font-size: 12px;
`;

export default ({ votes }) => <Votes>★ {votes} / 10</Votes>;
