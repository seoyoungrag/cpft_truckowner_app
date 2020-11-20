import React from "react";
import {View, Text} from "react-native";
import * as Calc from "../../../components/Calc";

export default (props) => {
  let total = 0;
  if(props.bool) {
    props.array.map(data => total += data.paymentValue)

  }
  return (
    <>
    <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 5}}>
      <Text style={{paddingLeft: 5}}>{props.data.paymentDetail}</Text>
      <Text style={{paddingLeft: 7}}>{props.data.payTimes}</Text>
      <Text>{Calc.regexWON(props.data.paymentValue)}원</Text>
    </View>
    {props.bool && 
      <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
        <Text>합계</Text>
        <Text style={{fontWeight: "bold", color: "#3e50b4"}}>{Calc.regexWON(total)}원</Text>
      </View>
    }
    </>
  )
}