import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Picker, Text, SafeAreaView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
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

const FilterContainer = styled.View`
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 margin-left: 15px;
 margin-right: 15px;
`;
const FilterHeader = styled.View`
 flex: 1;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 height: 30px;
`;
const FilterBody = styled.View`
 position: absolute;
 width: 100%;
 top: 30px;
 left: 0;
 z-index: 1;
 background: white;
`;
const FilterBtnList = styled.View`
 flex: 1;
 flex-direction: row;
 flex-wrap: wrap;
 align-items: center;
 justify-content: space-between;
 padding: 15px;
`;

const FilterBtn = styled.TouchableOpacity`
 flex: 1;
 border-width: 1px;
 padding-left: 10px;
 padding-right: 10px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;
const filter = (codes) => {
 const [filterSelected, setFilterSelected] = useState([false, false, false]);
 return (
  <>
   <FilterContainer>
    <FilterHeader>
     <FilterBtn
      onPress={() => {
       setFilterSelected([true, false, false]);
      }}
     >
      <Text>지역</Text>
      <FontAwesome5 name={"caret-down"} color={"black"} />
     </FilterBtn>
     <FilterBtn
      onPress={() => {
       setFilterSelected([false, true, false]);
      }}
     >
      <Text>모집유형</Text>
      <FontAwesome5 name={"caret-down"} color={"black"} />
     </FilterBtn>

     <FilterBtn
      onPress={() => {
       setFilterSelected([false, false, true]);
      }}
     >
      <Text>톤수</Text>
      <FontAwesome5 name={"caret-down"} color={"black"} />
     </FilterBtn>
     <FontAwesome5 name={"filter"} color={"black"} size={20} />
    </FilterHeader>
    <FilterBody>
     {filterSelected[0] && (
      <FilterBtnList>
       <Text style={{ width: 100 }}>전체</Text>
       {codes.map((code) => {
        return (
         code.codeCtgryNm === "차종" && (
          <Text style={{ width: 100 }}>
           {code.codeCtgryNm} {code.code} {code.codeValue}
          </Text>
         )
        );
       })}
      </FilterBtnList>
     )}

     {filterSelected[1] && (
      <>
       <Text>asdfasdf</Text>
       <Text>asdfasdf</Text>
       <Text>asdfasdf</Text>
       <Text>asdfasdf</Text>
       <Text>asdfasdf</Text>
      </>
     )}
     {filterSelected[2] && (
      <>
       <Text>asdfasdf</Text>
       <Text>asdfasdf</Text>
       <Text>asdfasdf</Text>
       <Text>asdfasdf</Text>
       <Text>asdfasdf</Text>
      </>
     )}
    </FilterBody>
   </FilterContainer>
  </>
 );
};

export default ({ refreshFn, loading, now, codes }) => {
 const Filter = filter(codes);
 return (
  <ScrollContainer refreshOn={true} refreshFn={refreshFn} loading={loading}>
   <>
    <List title="오더" filter={Filter}>
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
