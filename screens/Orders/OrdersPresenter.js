import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";
import Slide from "../../components/Movies/Slide";
import Vertical from "../../components/Vertical";
import HorizontalOrder from "../../components/HorizontalOrder";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import List from "../../components/List";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const SliderContainer = styled.View`
 width: 100%;
 height: ${HEIGHT / 4}px;
 margin-bottom: 40px;
`;

const Container = styled.View``;

const UpcomingContainer = styled.View``;
export default ({ refreshFn, loading, now }) => {
 return (
  <ScrollContainer refreshFn={refreshFn} loading={loading}>
   <>
    <List title="오더">
     {now.map((n) => (
      <HorizontalOrder
       key={n.orderSeq}
       id={n.orderSeq}
       opratSctn={n.opratSctn}
       workingArea={n.workingArea}
       rcritType={n.rcritType}
       carTypes={n.carTypes}
       tonType={n.tonType}
       dlvyPrdlst={n.dlvyPrdlst}
       payAmt={n.payAmt}
       payFullType={n.payFullType}
      />
     ))}
    </List>
   </>
  </ScrollContainer>
 );
};
