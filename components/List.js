import React from "react";
import styled from "styled-components/native";
import Title from "./Title";

const Container = styled.View`
 margin-top: 20px;
 padding-left: 15px;
 padding-right: 15px;
`;
const ListTitle = styled.View`
 margin-left: 15px;
 margin-right: 15px;
 margin-top: 15px;
 margin-left: 15px;
`;

const HeaderView = styled.View`
 position: absolute;
 width: 100%;
 top: 0px;
 left: 0px;
 z-index: 2;
 background-color: white;
`;
const BodyView = styled.View``;
const List = ({ title, filter, children }) => (
 <>
  <HeaderView>
   <Title title={title} />
   {filter ? filter : null}
  </HeaderView>
  <BodyView>
   <Container>{children}</Container>
  </BodyView>
 </>
);

export default List;
