import React, { useState } from "react";
import styled from "styled-components/native";
import {
 Dimensions,
 Picker,
 Text,
 SafeAreaView,
 View,
 TouchableWithoutFeedback,
 TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalOrder from "../../components/HorizontalOrder";
import ScrollContainer from "../../components/ScrollContainer";
import List from "../../components/List";
import { code } from "../../utils";
import { useIsModal, useSetIsModalProp } from "../../ModalContext";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const SliderContainer = styled.View`
 width: 100%;
 height: ${HEIGHT / 4}px;
 margin-bottom: 40px;
`;

const Container = styled.View``;

const UpcomingContainer = styled.View``;

const FilterContainer = styled.View`
 position: absolute;
 width: ${WIDTH - 30}px;
 left: 0;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 margin-left: 15px;
 margin-right: 15px;
 background-color: transparent;
 z-index: 999;
`;
const FilterHeader = styled.View`
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 background-color: white;
 margin-bottom: 10px;
`;

const FilterBody = styled.View`
 width: ${WIDTH}px;
`;

const ModalBody = styled.View`
 background-color: white;
 align-items: center;
 flex: 1;
`;

const FilterParentBtn = styled.TouchableOpacity`
 flex: 1;
 border-width: 1px;
 padding-left: 10px;
 padding-right: 10px;
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
`;

const FilterBtnList = styled.View`
 flex: 1;
 flex-flow: row;
 flex-wrap: wrap;
 justify-content: flex-start;
 align-content: space-between;
 align-items: stretch;
 width: 100%;
 border-top-width: 0.9px;
 border-bottom-width: 0.5px;
 margin-bottom: 15px;
`;

const FilterBtn = styled.Text`
 width: ${(WIDTH - 15 * 6) / 3}px;
 margin-top: 15px;
 margin-left: 15px;
 margin-right: 15px;
 border-width: 1px;
 border-radius: 10px;
 text-align: center;
 font-size: 16px;
`;

const FilterBottomButtons = styled.View`
 flex-direction: row;
 justify-content: space-around;
`;

const FilterBottomButton = styled.TouchableOpacity`
 flex: 1;
 align-items: center;
`;
const filter = (codes) => {
 const [filterSelected, setFilterSelected] = useState([false, false, false]);
 const setIsModal = useSetIsModalProp();
 return (
  <>
   <FilterContainer>
    <FilterHeader>
     <FilterParentBtn
      onPress={() => {
       setFilterSelected([true, false, false]);
       setIsModal(true);
      }}
     >
      <Text>지역</Text>
      <FontAwesome5 name={"caret-down"} color={"black"} />
     </FilterParentBtn>
     <FilterParentBtn
      onPress={() => {
       setFilterSelected([false, true, false]);
       setIsModal(true);
      }}
     >
      <Text>모집유형</Text>
      <FontAwesome5 name={"caret-down"} color={"black"} />
     </FilterParentBtn>

     <FilterParentBtn
      onPress={() => {
       setFilterSelected([false, false, true]);
       setIsModal(true);
      }}
     >
      <Text>톤수</Text>
      <FontAwesome5 name={"caret-down"} color={"black"} />
     </FilterParentBtn>
     <FontAwesome5 name={"filter"} color={"black"} size={20} />
    </FilterHeader>
    <FilterBody>
     {useIsModal() && filterSelected[0] && (
      <ModalBody>
       <FilterBtnList>
        <FilterBtn>전체</FilterBtn>
        {codes.map((code) => {
         return (
          code.codeCtgryNm === "지역" && (
           <FilterBtn key={code.code}>{code.codeValue}</FilterBtn>
          )
         );
        })}
       </FilterBtnList>
       <FilterBottomButtons>
        <FilterBottomButton
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <Text>확인</Text>
        </FilterBottomButton>
        <FilterBottomButton
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <Text>취소</Text>
        </FilterBottomButton>
       </FilterBottomButtons>
      </ModalBody>
     )}

     {useIsModal() && filterSelected[1] && (
      <ModalBody>
       <FilterBtnList>
        <FilterBtn>전체</FilterBtn>
        {codes.map((code) => {
         return (
          code.codeCtgryNm === "모집유형" && (
           <FilterBtn key={code.code}>{code.codeValue}</FilterBtn>
          )
         );
        })}
       </FilterBtnList>
       <FilterBottomButtons>
        <FilterBottomButton
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <Text>확인</Text>
        </FilterBottomButton>
        <FilterBottomButton
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <Text>취소</Text>
        </FilterBottomButton>
       </FilterBottomButtons>
      </ModalBody>
     )}
     {useIsModal() && filterSelected[2] && (
      <ModalBody>
       <FilterBtnList>
        <FilterBtn>전체</FilterBtn>
        {codes.map((code) => {
         return (
          code.codeCtgryNm === "톤수" && (
           <FilterBtn key={code.code}>{code.codeValue}</FilterBtn>
          )
         );
        })}
       </FilterBtnList>
       <FilterBottomButtons>
        <FilterBottomButton
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <Text>확인</Text>
        </FilterBottomButton>
        <FilterBottomButton
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <Text>취소</Text>
        </FilterBottomButton>
       </FilterBottomButtons>
      </ModalBody>
     )}
    </FilterBody>
   </FilterContainer>
  </>
 );
};

export default ({ refreshFn, loading, now, codes }) => {
 const Filter = filter(codes);
 return (
  <List title="오더" filter={Filter}>
   <ScrollContainer
    refreshOn={true}
    refreshFn={refreshFn}
    loading={loading}
    contentContainerStyle={{
     backgroundColor: useIsModal() ? "rgba(0,0,0,0.5)" : "white",
    }}
   >
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
   </ScrollContainer>
  </List>
 );
};
