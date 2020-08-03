import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Picker, Text, SafeAreaView, View,TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalOrder from "../../components/HorizontalOrder";
import ScrollContainer from "../../components/ScrollContainer";
import List from "../../components/List";
import { code } from "../../utils";
import {useIsModal, useSetIsModalProp} from "../../ModalContext"

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
width: ${WIDTH-30}px;
left:0;
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
background-color: rgba(0,0,0,0.5);
`;
const FilterBtnList = styled.View`
 flex-direction: row;
 flex-wrap: wrap;
 align-items: center;
 justify-content: center;
 padding: 15px;
 border-top-width: 0.9px;
 border-bottom-width: 0.5px;
`;

const FilterBtn = styled.TouchableOpacity`
 flex: 1;
 border-width: 1px;
 padding-left: 10px;
 padding-right: 10px;
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
`;

const FilterBottomButtons = styled.View`
flex-direction: row;
justify-content: space-around;
`;
const filter = (codes) => {
 const [filterSelected, setFilterSelected] = useState([false, false, false]);
 const setIsModal = useSetIsModalProp();
 return (
  <>
   <FilterContainer>
    <FilterHeader>
     <FilterBtn
      onPress={() => {
       setFilterSelected([true, false, false]);
       setIsModal(true);
      }}
     >
      <Text>지역</Text>
      <FontAwesome5 name={"caret-down"} color={"black"} />
     </FilterBtn>
     <FilterBtn
      onPress={() => {
       setFilterSelected([false, true, false]);
       setIsModal(true);
      }}
     >
      <Text>모집유형</Text>
      <FontAwesome5 name={"caret-down"} color={"black"} />
     </FilterBtn>

     <FilterBtn
      onPress={() => {
       setFilterSelected([false, false, true]);
       setIsModal(true);
      }}
     >
      <Text>톤수</Text>
      <FontAwesome5 name={"caret-down"} color={"black"} />
     </FilterBtn>
     <FontAwesome5 name={"filter"} color={"black"} size={20} />
    </FilterHeader>
    <FilterBody>
     {useIsModal() && filterSelected[0] && (
         <ModalBody>
         <View style={{backgroundColor: 'white', width: WIDTH}}>
      <FilterBtnList>
       <Text style={{  width: 100,
            borderWidth: 1,
            borderRadius: 10  }}>전체</Text>
       {codes.map((code) => {
        return (
         code.codeCtgryNm === "지역" && (
          <Text key={code.code} style={{ width: 100,
            borderWidth: 1,
            borderRadius: 10 }}>{code.codeValue}
          </Text>
         )
        );
       })}
      </FilterBtnList>
      <FilterBottomButtons>
        <TouchableOpacity onPress={()=>{
       setFilterSelected([false, false, false]);
       setIsModal(false);
       }} style={{flex:1, alignItems: "center"}}><Text>확인</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>{
      setFilterSelected([false, false, false]);
      setIsModal(false);
      }} style={{flex:1, alignItems: "center"}}><Text>취소</Text></TouchableOpacity></FilterBottomButtons>
      </View>
      </ModalBody>
     )}

     {useIsModal() && filterSelected[1] && (
         <ModalBody>
         <View style={{backgroundColor: 'white', width: WIDTH}}>
      <FilterBtnList>
       <Text style={{  width: 100,
            borderWidth: 1,
            borderRadius: 10  }}>전체</Text>
       {codes.map((code) => {
        return (
         code.codeCtgryNm === "모집유형" && (
          <Text key={code.code} style={{ width: 100,
            borderWidth: 1,
            borderRadius: 10 }}>{code.codeValue}
          </Text>
         )
        );
       })}
      </FilterBtnList>
      <FilterBottomButtons>
        <TouchableOpacity onPress={()=>{
       setFilterSelected([false, false, false]);
       setIsModal(false);
       }} style={{flex:1, alignItems: "center"}}><Text>확인</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>{
      setFilterSelected([false, false, false]);
      setIsModal(false);
      }} style={{flex:1, alignItems: "center"}}><Text>취소</Text></TouchableOpacity></FilterBottomButtons>
      </View>
      </ModalBody>
     )}
     {useIsModal() && filterSelected[2] && (
         <ModalBody>
         <View style={{backgroundColor: 'white', width: WIDTH}}>
      <FilterBtnList>
       <Text style={{  width: 100,
            borderWidth: 1,
            borderRadius: 10  }}>전체</Text>
       {codes.map((code) => {
        return (
         code.codeCtgryNm === "톤수" && (
          <Text key={code.code} style={{ width: 100,
            borderWidth: 1,
            borderRadius: 10 }}>{code.codeValue}
          </Text>
         )
        );
       })}
      </FilterBtnList>
      <FilterBottomButtons>
        <TouchableOpacity onPress={()=>{
       setFilterSelected([false, false, false]);
       setIsModal(false);
       }} style={{flex:1, alignItems: "center"}}><Text>확인</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>{
      setFilterSelected([false, false, false]);
      setIsModal(false);
      }} style={{flex:1, alignItems: "center"}}><Text>취소</Text></TouchableOpacity></FilterBottomButtons>
      </View>
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
  <ScrollContainer refreshOn={true} refreshFn={refreshFn} loading={loading} contentContainerStyle={{backgroundColor:useIsModal()? 'rgba(0,0,0,0.5)':'white'}}> 
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
