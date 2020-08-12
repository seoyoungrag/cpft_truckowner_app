import React from "react";
import styled from "styled-components/native";
import ScrollContainer from "../../components/ScrollContainer";
import { apiImage } from "../../api";
import { Dimensions, ActivityIndicator } from "react-native";
import Poster from "../../components/Poster";
import Votes from "../../components/Votes";
import { formatDate } from "../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import Link from "../../components/Detail/Link";

const BG = styled.Image`
 width: 100%;
 height: 100%;
 opacity: 0.4;
 position: absolute;
`;

const Header = styled.View`
 height: ${Dimensions.get("window").height / 3}px;
 align-items: center;
 justify-content: flex-end;
`;

const Container = styled.View`
 flex-direction: row;
 align-items: center;
 top: 30px;
`;

const Info = styled.View`
 width: 50%;
 margin-left: 40px;
`;

const Title = styled.Text`
 color: white;
 font-weight: 600;
 font-size: 24px;
 margin-bottom: 10px;
`;

const Data = styled.View`
 margin-top: 30px;
 padding: 0px 30px;
`;

const DataName = styled.Text`
 margin-top: 30px;
 color: white;
 opacity: 0.8;
 font-weight: 800;
 margin-bottom: 15px;
`;

const DataValue = styled.Text`
 color: white;
 opacity: 0.8;
 font-weight: 500;
`;

export default ({ loading, images }) => {
 console.log(images);
 return (
  <ScrollContainer
   loading={loading}
   contentContainerStyle={{ paddingBottom: 80 }}
  >
   <>
    <Header>
     <BG source={{ uri: images[0] }} />
    </Header>
   </>
  </ScrollContainer>
 );
};
