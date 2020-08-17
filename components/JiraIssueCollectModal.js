import React, { useState, useEffect } from "react";
import {
 Modal,
 TouchableOpacity,
 View,
 Text,
 StyleSheet,
 Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useGetUserRegistInfo } from "../UserRegistContext";

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
 centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "flex-end",
 },
 modalView: {
  marginBottom: 0,
  paddingBottom: 22,
  backgroundColor: "white",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
   width: 0,
   height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
 },
 openButton: {
  backgroundColor: "#F194FF",
  borderRadius: 10,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
  elevation: 2,
 },
 textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  marginLeft: 20,
  marginRight: 20,
  marginTop: 5,
  marginBottom: 5,
 },
 modalTItle: {
  fontSize: 24,
  marginLeft: 5,
  textAlign: "center",
 },
 modalBody: {
  marginBottom: 15,
  textAlign: "center",
 },
});

export default ({ modalVisible, setModalVisible, menuName }) => {
 const navigation = useNavigation();
 const getUserRegistInfo = useGetUserRegistInfo();
 const [userRegistInfo, setUserRegistInfoProp] = useState(null);
 const fetchData = async () => {
  const data = await getUserRegistInfo();
  setUserRegistInfoProp(data);
 };
 const INJECTED_JAVASCRIPT = `
 function loaded() {
    //document.querySelector('#fullname').style.backgroundColor = 'red';
    //document.querySelectorAll('.group').forEach(e => e.style.display="none");
    document.querySelector('body').style.fontSize="50px";
    document.querySelectorAll('legend').forEach(e => e.style.display="none");
    document.querySelectorAll('.ratings').forEach(e => e.style.padding="0px");
    document.querySelectorAll('.msg-container').forEach(e => e.style.display="none");
    document.querySelectorAll('.aui-message').forEach(e => e.style.display="none");
    document.querySelectorAll('.content-body').forEach(e => e.style.top="0px");
    document.querySelectorAll('.dialog-button-panel').forEach(e => e.style.height="130px");
    document.querySelectorAll('.aui-button').forEach(e => e.style.fontSize="50px");
    document.querySelectorAll('.cancel').forEach(e => e.style.display="none");
    document.querySelector('#fullname').value="${userRegistInfo?.userNm}";
    document.querySelector('#email').value="${menuName}";
    document.querySelector('#recordWebInfoConsent').checked = true;
    document.querySelector('#name-group').style.display="none";
    document.querySelector('#email-group').style.display="none";
    document.querySelector('#record-web-info-consent-container').style.display="none";     
    document.querySelectorAll('label').forEach(e => e.style.fontSize="50px");
    document.querySelectorAll('label').forEach(e => e.style.float="unset");
    document.querySelectorAll('label').forEach(e => e.style.marginLeft="0px");
    document.querySelectorAll('.dialog-title').forEach(e => e.style.display="none");
    document.querySelectorAll('textarea').forEach(e => e.style.width="100%");
    document.querySelectorAll('textarea').forEach(e => e.style.fontSize="50px");
    document.querySelectorAll('textarea').forEach(e => e.style.maxWidth="unset");
    document.querySelectorAll('textarea').forEach(e => e.rows="2");
    document.querySelectorAll('.field-group').forEach(e => e.style.padding="0");
    document.querySelectorAll('input[type=radio]').forEach(e => e.style.width="50px");
    document.querySelectorAll('input[type=radio]').forEach(e => e.style.height="50px");
    document.querySelectorAll('img').forEach(e => e.style.display="none");
    jQuery(jQuery("span.rating-label")[2]).text("평균");
    jQuery(".field-group").css("padding-top",'50px')
    jQuery('.content-body').append('<p>제출 후 창을 닫아주세요</p>')
    jQuery("#screenshot-group").parent().hide();
 }
 window.onload = loaded;
 window.onload();`;

 useEffect(() => {
  const unsubscribe = navigation.addListener("focus", async () => {
   if (!userRegistInfo) {
    await fetchData();
   } else {
   }
  });
  return unsubscribe;
 }, [navigation]);
 return (
  <Modal
   animationType="fade"
   hardwareAccelerated={true}
   transparent={true}
   statusBarTranslucent={true}
   visible={modalVisible}
  >
   <View style={styles.centeredView}>
    <View style={styles.modalView}>
     <WebView
      javaScriptEnabled={true}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      containerStyle={{ width: width, height: (height * 3) / 4, flex: 0 }}
      source={{
       uri:
        "https://jira.teamfresh.co.kr/rest/collectors/1.0/template/form/38ac04fb?os_authType=none",
      }}
     />
     <View style={{ flexDirection: "row", marginTop: 20 }}>
      <TouchableOpacity
       style={{
        ...styles.openButton,
        backgroundColor: "#2196F3",
       }}
       onPress={() => {
        setModalVisible(!modalVisible);
       }}
      >
       <Text style={[styles.textStyle, { color: "white" }]}>닫기</Text>
      </TouchableOpacity>
     </View>
    </View>
   </View>
  </Modal>
 );
};
