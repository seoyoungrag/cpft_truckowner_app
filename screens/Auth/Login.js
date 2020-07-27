import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import Svg, { Circle, Rect, Line } from "react-native-svg";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { LOG_IN } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";
import PatternLockContianer from "./PatternLock/PatternLockContianer";

const View = styled.View`
 justify-content: center;
 align-items: center;
 flex: 1;
`;

export default ({ navigation }) => {
 const logIn = useLogIn();

 const loginSuccess = () => {
  logIn("testToken");
 };
 const emailInput = useInput("");
 const [loading, setLoading] = useState(false);
 const handleLogin = async () => {
  const { value } = emailInput;
  /*
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value === "") {
   return Alert.alert("Email can't be empty");
  } else if (!value.includes("@") || !value.includes(".")) {
   return Alert.alert("Please write an email");
  } else if (!emailRegex.test(value)) {
   return Alert.alert("That email is invalid");
  }
  */
  try {
   setLoading(true);
   const { data } = await LOG_IN({
    userLoginId: emailInput.value,
    userLoginPw: "1234",
   });
   if (data) {
    logIn(data.token);
    //navigation.navigate("Confirm", { email: value });
    //navigation.navigate("Tabs");
    return;
   } else {
    Alert.alert("Account not found");
    navigation.navigate("Signup", { email: value });
   }
  } catch (e) {
   console.log(e);
   Alert.alert("Can't log in now");
  } finally {
   setLoading(false);
  }
 };
 return <PatternLockContianer loginSuccess={loginSuccess} />;
};
