import React from "react";
import styled from "styled-components/native";
import Title from "./Title";
import { View } from "react-native";

const Container = styled.View`
 flex: 1;
 margin-top: 10px;
 padding-top: 35px;
 margin-bottom: 45px;
`;
const ListTitle = styled.View`
 margin-left: 15px;
 margin-right: 15px;
 margin-top: 15px;
 margin-left: 15px;
`;

const HeaderView = styled.View``;
const BodyView = styled.View``;
const List = ({ title, filter, children }) => {
 return (
  <View style={{ flex: 1, backgroundColor: "white" }}>
   <Title title={title} />
   <Container style={{ paddingTop: filter ? 35 : 0 }}>
    {children}
    {filter}
   </Container>
  </View>
 );
};

export default List;
