import React, { Component } from "react";
import { View, StatusBar, TextInput, Animated } from "react-native";

export default class FloatingLabelInput extends Component {
 constructor(props) {
  super(props);
  this.state = {
   isFocused: false,
   value: "",
  };
  this._animatedIsFocused = new Animated.Value(
   !this.props.defaultValue || this.state.value === "" ? 0 : 1
  );
 }

 handleFocus = () => this.setState({ isFocused: true });
 handleBlur = () => this.setState({ isFocused: false });

 componentDidUpdate() {
  Animated.timing(this._animatedIsFocused, {
   toValue:
    this.state.isFocused ||
    this.props.defaultValue ||
    (this.state.value !== undefined && this.state.value !== "")
     ? 1
     : 0,
   duration: 100,
   useNativeDriver: false,
  }).start();
 }
 componentDidMount() {
  this.setState({ value: this.props.defaultValue });
 }
 render() {
  const { label, ...props } = this.props;
  const labelStyle = {
   position: "absolute",
   paddingTop: 10,
   left: 0,
   top: this._animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
   }),
   fontSize: this._animatedIsFocused.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 14],
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
      height: 35,
      fontSize: 20,
      color: "#000",
      borderBottomWidth: 1,
      borderBottomColor: "#909090",
      paddingBottom: 0,
      paddingLeft: 0,
     }}
     placeholderTextColor="rgba(0,0,0,0)"
     onFocus={this.handleFocus}
     onBlur={this.handleBlur}
     onChangeText={(value) => {
      if (this.props.keyboardType && this.props.keyboardType == "numeric") {
       if (this.props.keyboardTypeAddOn == "corpNum") {
        value = value.replace(/[^0-9]/g, "");
        const input = value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
        const zip = input.substring(0, 3);
        const middle = input.substring(3, 5);
        const last = input.substring(5, 10);

        if (input.length > 5) {
         value = `${zip}-${middle}-${last}`;
        } else if (input.length > 3) {
         value = `${zip}-${middle}`;
        } else if (input.length > 0) {
         value = `${zip}`;
        }
        this.setState({ value });
       } else {
        value = value.replace(/[^0-9]/g, "");
        this.setState({ value });
       }
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

       value = value.replace(/[^0-9]/g, "");
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
       this.setState({ value });
      } else {
       this.setState({ value });
      }
      this.props.onChangeText(this.props.fieldNm, value);
     }}
     blurOnSubmit
     value={this.state.value}
    />
   </View>
  );
 }
}
