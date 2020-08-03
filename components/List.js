import React from "react";
import styled from "styled-components/native";
import Title from "./Title";

const Container = styled.View`
 margin-top: 20px;
 padding-left: 15px;
 padding-right: 15px;
`;

const List = ({ title, children }) => (
 <>
  <Title title={title} />
  <Container>{children}</Container>
 </>
);

export default List;
