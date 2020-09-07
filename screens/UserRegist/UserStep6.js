import React, { useState, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import firebase from "firebase";

// Initialize Firebase JS SDK
// https://firebase.google.com/docs/web/setup
try {
 firebase.initializeApp({
  apiKey: "AIzaSyCXR8WaYox4yk6OWUWG2Zw_2twtPfMPjcE",
  /*authDomain: "cpft-truckowner-test.firebaseapp.com",*/
  authDomain: "blue.teamfresh.co.kr",
  databaseURL: "https://cpft-truckowner-test.firebaseio.com",
  projectId: "cpft-truckowner-test",
  storageBucket: "cpft-truckowner-test.appspot.com",
  messagingSenderId: "386604076049",
  appId: "1:386604076049:web:6992466c3970e0b261b5b0",
  measurementId: "G-XKH2QH4ZPV",
 });
} catch (err) {
 // ignore app already initialized error in snack
}

export default App = () => {
 const [phoneNumber, setPhoneNumber] = useState("");
 const [code, setCode] = useState("");
 const recaptchaVerifier = useRef(null);
 const [verificationId, setVerificationId] = useState(null);

 // Function to be called when requesting for a verification code
 const sendVerification = () => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  var phoneNumberNational = phoneNumber;
  if (!phoneNumberNational.includes("+82")) {
   phoneNumberNational = "+82" + phoneNumberNational;
  }
  console.log(phoneNumberNational);
  phoneProvider
   .verifyPhoneNumber(phoneNumberNational, recaptchaVerifier.current)
   .then(setVerificationId);
 };

 // Function to be called when confirming the verification code that we received
 // from Firebase via SMS
 const confirmCode = () => {
  console.log(verificationId, code);
  const credential = firebase.auth.PhoneAuthProvider.credential(
   verificationId,
   code
  );
  firebase
   .auth()
   .signInWithCredential(credential)
   .then((result) => {
    // Do something with the results here
    alert(result);
   });
 };

 return (
  <SafeAreaView
   style={{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
   }}
  >
   {/* Phone Number Input */}
   <TextInput
    placeholder="Phone Number"
    onChangeText={setPhoneNumber}
    keyboardType="phone-pad"
    autoCompleteType="tel"
   />
   <TouchableOpacity onPress={sendVerification}>
    <Text>Send Verification</Text>
   </TouchableOpacity>
   {/* Verification Code Input */}
   <TextInput
    placeholder="Confirmation Code"
    onChangeText={setCode}
    keyboardType="number-pad"
   />
   <TouchableOpacity onPress={confirmCode}>
    <Text>Send Verification</Text>
   </TouchableOpacity>
   <FirebaseRecaptchaVerifierModal
    ref={recaptchaVerifier}
    firebaseConfig={firebase.app().options}
   />
  </SafeAreaView>
 );
};
