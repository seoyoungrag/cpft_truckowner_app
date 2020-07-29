import React, { Component } from "react";
import { View, StatusBar, TextInput, Animated } from "react-native";

export default class FloatingLabelInput extends Component {
 constructor(props) {
  super(props);
  this.state = {
   isFocused: false,
   value: this.props.defaultValue ? this.props.defaultValue : "",
  };
  this._animatedIsFocused = new Animated.Value(this.state.value === "" ? 0 : 1);
 }

 handleFocus = () => this.setState({ isFocused: true });
 handleBlur = () => this.setState({ isFocused: false });

 componentDidUpdate() {
  this.props.onChangeText(this.props.fieldNm, this.state.value);
  Animated.timing(this._animatedIsFocused, {
   toValue: this.state.isFocused || this.state.value !== "" ? 1 : 0,
   duration: 200,
   useNativeDriver: false,
  }).start();
 }

 render() {
  const { label, ...props } = this.props;
  const labelStyle = {
   position: "absolute",
   left: 0,
   top: this._animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
   }),
   fontSize: this._animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 14],
   }),
   color: this._animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: ["#aaa", "#000"],
   }),
  };
  return (
   <View style={[{ ...props.containerStyle, paddingTop: 18 }]}>
    <Animated.Text style={labelStyle}>{label}</Animated.Text>
    <TextInput
     {...props}
     style={{
      height: 30,
      fontSize: 20,
      color: "#000",
      borderBottomWidth: 1,
      borderBottomColor: "#555",
     }}
     placeholderTextColor="rgba(0,0,0,0)"
     onFocus={this.handleFocus}
     onBlur={this.handleBlur}
     onChangeText={(value) => {
      if (this.props.keyboardType && this.props.keyboardType == "numeric") {
       value = value.replace(/[^0-9]/g, "");
       this.setState({ value });
      } else if (
       this.props.keyboardType &&
       this.props.keyboardType == "phone-pad"
      ) {
       /*
       value = ("" + value).replace(/\D/g, "");
       var match = value.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
       if (match) {
        var intlCode = match[1] ? "+1 " : "",
         value = [intlCode, match[2], "-", match[3], "-", match[4]].join("");
       }
       */

       const input = value.replace(/\D/g, "").substring(0, 11); // First ten digits of input only
       const zip = input.substring(0, 3);
       const middle = input.substring(3, 7);
       const last = input.substring(7, 11);

       if (input.length > 7) {
        value = `${zip}-${middle}-${last}`;
       } else if (input.length > 3) {
        value = `${zip}-${middle}`;
       } else if (input.length > 0) {
        value = `${zip}`;
       }
       console.log(value);
       this.setState({ value });
      } else {
       this.setState({ value });
      }
     }}
     blurOnSubmit
     value={this.state.value}
    />
   </View>
  );
 }
}
