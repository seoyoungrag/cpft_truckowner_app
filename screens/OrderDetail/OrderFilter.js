import React, {
 useState,
 useEffect,
 useLayoutEffect,
 useCallback,
} from "react";
import styled from "styled-components/native";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import HorizontalOrder from "../../components/HorizontalOrder";
import ScrollContainer from "../../components/ScrollContainer";
import List from "../../components/List";
import { code, trimText } from "../../utils";
import { useIsModal, useSetIsModalProp } from "../../ModalContext";
import { useCodes } from "../../CodeContext";

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
 margin-left: 10px;
 margin-right: 10px;
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 border-radius: 10px;
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
 padding-bottom: 15px;
 border-bottom-width: 0.5px;
 border-color: grey;
`;

const FilterBtn = styled.TouchableOpacity`
 width: ${(WIDTH - 15 * 6) / 3}px;
 margin-top: 15px;
 margin-left: 15px;
 margin-right: 15px;
 border-width: 1px;
 border-radius: 10px;
 text-align: center;
 font-size: 16px;
 align-items: center;
 justify-content: center;
`;

const FilterBottomButtons = styled.View`
 flex-direction: row;
 justify-content: space-around;
`;

const FilterBottomButton = styled.TouchableOpacity`
 flex: 1;
 align-items: center;
 justify-content: center;
 background-color: #3a99fc;
 height: 50px;
`;
const FilterBottomButtonText = styled.Text`
 color: white;
`;

const FilterBottomButtonCancel = styled.TouchableOpacity`
 flex: 1;
 align-items: center;
 justify-content: center;
 background-color: whitesmoke;
 height: 50px;
`;

export default () => {
 const codes = useCodes();
 const [filterBtnSelected1, setFilterBtnSelected1] = useState([]);
 const [filterBtnSelectedAll1, setFilterBtnSelectedAll1] = useState(false);
 const [filterBtnSelected2, setFilterBtnSelected2] = useState([]);
 const [filterBtnSelectedAll2, setFilterBtnSelectedAll2] = useState(false);
 const [filterBtnSelected3, setFilterBtnSelected3] = useState([]);
 const [filterBtnSelectedAll3, setFilterBtnSelectedAll3] = useState(false);
 const [filterSelected, setFilterSelected] = useState([false, false, false]);
 const setIsModal = useSetIsModalProp();
 const navigation = useNavigation();

 return (
  <>
   <FilterContainer>
    <FilterHeader>
     <FilterParentBtn
      style={{
       borderColor: filterSelected[0] ? "#3a99fc" : "grey",
      }}
      onPress={() => {
       setFilterSelected([true, false, false]);
       setIsModal(true);
      }}
     >
      <Text>
       {filterBtnSelected1.length > 0
        ? trimText(
           filterBtnSelected1
            .map((c, i) => {
             return code(codes, c);
            })
            .join(),
           7
          )
        : "지역전체"}
      </Text>
      <FontAwesome5
       name={filterSelected[0] ? "caret-square-down" : "caret-square-right"}
       color={filterSelected[0] ? "#3a99fc" : "grey"}
      />
     </FilterParentBtn>
     <FilterParentBtn
      style={{ borderColor: filterSelected[1] ? "#3a99fc" : "grey" }}
      onPress={() => {
       setFilterSelected([false, true, false]);
       setIsModal(true);
      }}
     >
      <Text>
       {filterBtnSelected2.length > 0
        ? trimText(
           filterBtnSelected2
            .map((c, i) => {
             return code(codes, c);
            })
            .join(),
           7
          )
        : "모집유형전체"}
      </Text>
      <FontAwesome5
       name={filterSelected[1] ? "caret-square-down" : "caret-square-right"}
       color={filterSelected[1] ? "#3a99fc" : "grey"}
      />
     </FilterParentBtn>

     <FilterParentBtn
      style={{ borderColor: filterSelected[2] ? "#3a99fc" : "grey" }}
      onPress={() => {
       setFilterSelected([false, false, true]);
       setIsModal(true);
      }}
     >
      <Text>
       {filterBtnSelected3.length > 0
        ? trimText(
           filterBtnSelected3
            .map((c, i) => {
             return code(codes, c);
            })
            .join(),
           7
          )
        : "톤수전체"}
      </Text>
      <FontAwesome5
       name={filterSelected[2] ? "caret-square-down" : "caret-square-right"}
       color={filterSelected[2] ? "#3a99fc" : "grey"}
      />
     </FilterParentBtn>
     <TouchableOpacity
      onPress={() => {
       navigation.navigate("Filter", {
        filterBtnSelected1,
        filterBtnSelectedAll1,
        filterBtnSelected2,
        filterBtnSelectedAll2,
        filterBtnSelected3,
        filterBtnSelectedAll3,
       });
      }}
     >
      <FontAwesome5 name={"filter"} color={"grey"} size={20} />
     </TouchableOpacity>
    </FilterHeader>
    <FilterBody>
     {useIsModal() && filterSelected[0] && (
      <ModalBody>
       <FilterBtnList>
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelectedAll1 ? "#3a99fc" : "whitesmoke",
         }}
         onPress={() => {
          setFilterBtnSelectedAll1(true);
          setFilterBtnSelected1([]);
         }}
        >
         <Text>전체</Text>
        </FilterBtn>
        {codes.map((code) => {
         return (
          code.codeCtgryNm === "지역" && (
           <FilterBtn
            activeOpacity={1}
            style={{
             borderColor: filterBtnSelected1.includes(code.code)
              ? "#3a99fc"
              : "whitesmoke",
            }}
            key={code.code}
            onPress={() => {
             var cd = `${code.code}`;
             setFilterBtnSelectedAll1(false);
             if (
              filterBtnSelected1.length > 1 &&
              filterBtnSelected1.includes(cd)
             ) {
              var arr = filterBtnSelected1.filter((item) => item !== cd);
              setFilterBtnSelected1(arr);
             } else if (!filterBtnSelected1.includes(cd)) {
              setFilterBtnSelected1([...filterBtnSelected1, cd]);
             }
            }}
           >
            <Text>{code.codeValue}</Text>
           </FilterBtn>
          )
         );
        })}
       </FilterBtnList>
       <FilterBottomButtons>
        <FilterBottomButtonCancel
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <Text>취소</Text>
        </FilterBottomButtonCancel>
        <FilterBottomButton
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <FilterBottomButtonText>확인</FilterBottomButtonText>
        </FilterBottomButton>
       </FilterBottomButtons>
      </ModalBody>
     )}

     {useIsModal() && filterSelected[1] && (
      <ModalBody>
       <FilterBtnList>
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelectedAll2 ? "#3a99fc" : "whitesmoke",
         }}
         onPress={() => {
          setFilterBtnSelectedAll2(true);
          setFilterBtnSelected2([]);
         }}
        >
         <Text>전체</Text>
        </FilterBtn>
        {codes.map((code) => {
         return (
          code.codeCtgryNm === "모집유형" && (
           <FilterBtn
            activeOpacity={1}
            style={{
             borderColor: filterBtnSelected2.includes(code.code)
              ? "#3a99fc"
              : "whitesmoke",
            }}
            key={code.code}
            onPress={() => {
             var cd = `${code.code}`;
             setFilterBtnSelectedAll2(false);
             if (
              filterBtnSelected2.length > 1 &&
              filterBtnSelected2.includes(cd)
             ) {
              var arr = filterBtnSelected2.filter((item) => item !== cd);
              setFilterBtnSelected2(arr);
             } else if (!filterBtnSelected2.includes(cd)) {
              setFilterBtnSelected2([...filterBtnSelected2, cd]);
             }
            }}
           >
            <Text>{code.codeValue}</Text>
           </FilterBtn>
          )
         );
        })}
       </FilterBtnList>
       <FilterBottomButtons>
        <FilterBottomButtonCancel
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <Text>취소</Text>
        </FilterBottomButtonCancel>
        <FilterBottomButton
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <FilterBottomButtonText>확인</FilterBottomButtonText>
        </FilterBottomButton>
       </FilterBottomButtons>
      </ModalBody>
     )}
     {useIsModal() && filterSelected[2] && (
      <ModalBody>
       <FilterBtnList>
        <FilterBtn
         activeOpacity={1}
         style={{
          borderColor: filterBtnSelectedAll3 ? "#3a99fc" : "whitesmoke",
         }}
         onPress={() => {
          setFilterBtnSelectedAll3(true);
          setFilterBtnSelected3([]);
         }}
        >
         <Text>전체</Text>
        </FilterBtn>
        {codes.map((code) => {
         return (
          code.codeCtgryNm === "톤수" && (
           <FilterBtn
            activeOpacity={1}
            style={{
             borderColor: filterBtnSelected3.includes(code.code)
              ? "#3a99fc"
              : "whitesmoke",
            }}
            key={code.code}
            onPress={() => {
             var cd = `${code.code}`;
             setFilterBtnSelectedAll3(false);
             if (
              filterBtnSelected3.length > 1 &&
              filterBtnSelected3.includes(cd)
             ) {
              var arr = filterBtnSelected3.filter((item) => item !== cd);
              setFilterBtnSelected3(arr);
             } else if (!filterBtnSelected3.includes(cd)) {
              setFilterBtnSelected3([...filterBtnSelected3, cd]);
             }
            }}
           >
            <Text>{code.codeValue}</Text>
           </FilterBtn>
          )
         );
        })}
       </FilterBtnList>
       <FilterBottomButtons>
        <FilterBottomButtonCancel
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <Text>취소</Text>
        </FilterBottomButtonCancel>
        <FilterBottomButton
         onPress={() => {
          setFilterSelected([false, false, false]);
          setIsModal(false);
         }}
        >
         <FilterBottomButtonText>확인</FilterBottomButtonText>
        </FilterBottomButton>
       </FilterBottomButtons>
      </ModalBody>
     )}
    </FilterBody>
   </FilterContainer>
  </>
 );
};
