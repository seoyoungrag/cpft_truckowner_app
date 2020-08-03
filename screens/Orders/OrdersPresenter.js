import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import HorizontalOrder from "../../components/HorizontalOrder";
import ScrollContainer from "../../components/ScrollContainer";
import List from "../../components/List";
import { code } from "../../utils";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const SliderContainer = styled.View`
 width: 100%;
 height: ${HEIGHT / 4}px;
 margin-bottom: 40px;
`;

const Container = styled.View``;

const UpcomingContainer = styled.View``;

export default ({ refreshFn, loading, now, codes }) => {
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
       rcritType={code(codes, n.rcritType)}
       carTypes={n.carTypes.map((c) => {
        return code(codes, c) + " ";
       })}
       tonType={code(codes, n.tonType)}
       dlvyPrdlst={n.dlvyPrdlst}
       payAmt={n.payAmt}
       payFullType={code(codes, n.payFullType)}
      />
     ))}
     {now.map((n) => (
      <HorizontalOrder
       key={n.orderSeq}
       id={n.orderSeq}
       opratSctn={n.opratSctn}
       workingArea={n.workingArea}
       rcritType={code(codes, n.rcritType)}
       carTypes={n.carTypes.map((c) => {
        return code(codes, c) + " ";
       })}
       tonType={code(codes, n.tonType)}
       dlvyPrdlst={n.dlvyPrdlst}
       payAmt={n.payAmt}
       payFullType={code(codes, n.payFullType)}
      />
     ))}
     {now.map((n) => (
      <HorizontalOrder
       key={n.orderSeq}
       id={n.orderSeq}
       opratSctn={n.opratSctn}
       workingArea={n.workingArea}
       rcritType={code(codes, n.rcritType)}
       carTypes={n.carTypes.map((c) => {
        return code(codes, c) + " ";
       })}
       tonType={code(codes, n.tonType)}
       dlvyPrdlst={n.dlvyPrdlst}
       payAmt={n.payAmt}
       payFullType={code(codes, n.payFullType)}
      />
     ))}
     {now.map((n) => (
      <HorizontalOrder
       key={n.orderSeq}
       id={n.orderSeq}
       opratSctn={n.opratSctn}
       workingArea={n.workingArea}
       rcritType={code(codes, n.rcritType)}
       carTypes={n.carTypes.map((c) => {
        return code(codes, c) + " ";
       })}
       tonType={code(codes, n.tonType)}
       dlvyPrdlst={n.dlvyPrdlst}
       payAmt={n.payAmt}
       payFullType={code(codes, n.payFullType)}
      />
     ))}
    </List>
   </>
  </ScrollContainer>
 );
};
