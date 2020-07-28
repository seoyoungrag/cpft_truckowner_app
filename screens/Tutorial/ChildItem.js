import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const OuterContainer = styled.View`
 flex: 1;
`;
const DescText = styled.Text`
 text-align: center;
 color: #3a99fc;
 font-weight: bold;
 font-size: 24px;
`;
const TutoImage = styled.Image``;
export default ChildItem = ({
 item,
 style,
 onPress,
 index,
 imageKey,
 local,
 height,
}) => {
 return (
  <OuterContainer>
   <DescText>{item["desc"]}</DescText>
   <TutoImage
    style={[styles.image, style, { height: height, resizeMode: "contain" }]}
    source={local ? item[imageKey] : { uri: item[imageKey] }}
   />
  </OuterContainer>
 );
};

const styles = StyleSheet.create({
 container: {},
 image: {
  height: 230,
  resizeMode: "stretch",
 },
});
