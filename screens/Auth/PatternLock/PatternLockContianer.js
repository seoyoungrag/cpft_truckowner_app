import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 StyleSheet,
 Animated,
 PanResponder,
 Platform,
 Dimensions,
 BackHandler,
} from "react-native";
import styled from "styled-components";
import * as Animatable from "react-native-animatable";
import constants from "../../../constants";
import PatternLockPresenter from "./PatternLockPresenter";

const { width, height } = Dimensions.get("window");

const PATTERN_CONTAINER_HEIGHT = height / 2;
const PATTERN_CONTAINER_WIDTH = width;
const PATTERN_DIMENSION = 3;
const CORRECT_UNLOCK_PATTERN = [
 { x: 0, y: 0 },
 { x: 1, y: 0 },
 { x: 2, y: 0 },
 { x: 1, y: 1 },
 { x: 0, y: 2 },
 { x: 1, y: 2 },
 { x: 2, y: 2 },
];
const HINT_DELAY = 3000;

const updateClock = () => {
 let now = new Date();
 let [hour, minute] = now.toTimeString().split(":");
 let dayName = constants.getDayName(now.getDay());
 let monthName = constants.getMonthName(now.getUTCMonth());
 let date = now.getUTCDate();
 return {
  hour,
  minute,
  dayName,
  monthName,
  date,
 };
};
export default ({ loginSuccess }) => {
 const onMatchedPattern = () => {
  loginSuccess();
 };
 const [showPatternLock, setShowPatternLock] = useState(false);
 const [currentDateTime, setCurrentDateTime] = useState(updateClock());

 const _panYCoordinate = new Animated.Value(0);
 const _patternContainerOpacity = new Animated.Value(0);
 let _value = 0;
 _panYCoordinate.addListener(({ value }) => (_value = value));

 const resetAnimation = () => {
  Animated.timing(_panYCoordinate, {
   toValue: 0,
   duration: 200,
   useNativeDriver: false,
  }).start();
 };

 const _panResponder = PanResponder.create({
  onMoveShouldSetResponderCapture: () => !showPatternLock,
  onMoveShouldSetPanResponderCapture: () => !showPatternLock,

  onPanResponderGrant: () => {
   _panYCoordinate.setValue(0);
  },

  onPanResponderMove: (e, gestureState) => {
   let { dy } = gestureState;
   _panYCoordinate.setValue(dy);
  },

  onPanResponderRelease: () => {
   if (_value < -200) {
    setShowPatternLock(true);
   } else {
    resetAnimation();
   }
  },
 });

 const onBackPress = () => {
  if (showPatternLock) {
   setShowPatternLock(false);
   _patternContainerOpacity.setValue(0);
   resetAnimation();
   return true;
  } else {
   BackHandler.exitApp();
   return false;
  }
 };

 let _updateClockInterval;
 BackHandler.addEventListener("hardwareBackPress", onBackPress);
 useEffect(() => {
  if (showPatternLock) {
   Animated.parallel([
    Animated.timing(_panYCoordinate, {
     toValue: -500,
     duration: 0,
     useNativeDriver: false,
    }),
    Animated.timing(_patternContainerOpacity, {
     toValue: 1,
     duration: 400,
     useNativeDriver: true,
    }),
   ]).start();
  }
  /*
  _updateClockInterval = setInterval(() => {
   let currentDateTime = updateClock();
   setCurrentDateTime(currentDateTime);
  }, 1000);
*/
 }, [showPatternLock]);

 useEffect(() => {
  return () => {
   clearInterval(_updateClockInterval);
   BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  };
 });
 let { hour, minute, dayName, monthName, date } = currentDateTime;

 const paddingTop = _panYCoordinate.interpolate({
  inputRange: [-250, 0],
  outputRange: [170, 150],
  extrapolate: "clamp",
 });

 const patternLockScale = _panYCoordinate.interpolate({
  inputRange: [-250, 0, 200],
  outputRange: [0.5, 1, 1.2],
  extrapolate: "clamp",
 });

 const timeOpacity = _panYCoordinate.interpolate({
  inputRange: [-250, 0],
  outputRange: [0, 1],
  extrapolate: "clamp",
 });

 const backgroundOpacity = _panYCoordinate.interpolate({
  inputRange: [-250, 0],
  outputRange: [0.2, 1],
  extrapolate: "clamp",
 });
 //console.log(showPatternLock, _panYCoordinate, patternLockScale, _patternContainerOpacity);
 return (
  <View style={styles.root}>
   <Animated.View
    style={[styles.backgroundContainer, { opacity: backgroundOpacity }]}
   >
    <Animated.View
     style={{
      ...styles.dateContainer,
      paddingTop,
      opacity: timeOpacity,
      transform: [{ scale: patternLockScale }],
     }}
     {..._panResponder.panHandlers}
    >
     <Text style={styles.time}>{`${hour}:${minute}`}</Text>
     <Text style={styles.date}>{`${dayName}, ${monthName} ${date}`}</Text>
    </Animated.View>
    <View style={{ alignItems: "center", paddingBottom: 20 }}>
     <Animatable.Text
      delay={HINT_DELAY}
      animation="slideInUp"
      iterationCount="infinite"
      direction="alternate"
      easing="ease-out"
      duration={1500}
      style={[styles.hint, { opacity: timeOpacity }]}
     >
      스와이프해서 로그인 하세요.
     </Animatable.Text>
    </View>
   </Animated.View>
   {showPatternLock ? (
    <Animated.View
     style={[styles.patternContainer, { opacity: _patternContainerOpacity }]}
    >
     <PatternLockPresenter
      containerDimension={PATTERN_DIMENSION}
      containerWidth={PATTERN_CONTAINER_WIDTH}
      containerHeight={PATTERN_CONTAINER_HEIGHT}
      correctPattern={CORRECT_UNLOCK_PATTERN}
      hint="Z를 그려보셈."
      onPatternMatch={onBackPress}
      onMatchedPattern={onMatchedPattern}
     />
     {Platform.OS === "ios" && (
      <View style={styles.backButtonContainer}>
       <Icon
        component={TouchableOpacity}
        onPress={onBackPress}
        name="chevron-left"
        color="white"
        size={45}
       />
      </View>
     )}
    </Animated.View>
   ) : null}
  </View>
 );
};
const styles = StyleSheet.create({
 root: {
  flex: 1,
  backgroundColor: "black",
 },
 backgroundContainer: {
  flex: 1,
  alignItems: "center",
  height,
  width,
 },
 dateContainer: {
  flex: 1,
  backgroundColor: "transparent",
  alignItems: "center",
 },
 time: {
  fontSize: 80,
  fontWeight: "300",
  color: "#f2f2f2",
 },
 date: {
  fontSize: 20,
  color: "#f2f2f2",
 },
 patternContainer: {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "transparent",
 },
 backButtonContainer: {
  alignItems: "flex-start",
  paddingLeft: 40,
  paddingBottom: 10,
 },
 hint: {
  backgroundColor: "transparent",
  color: "#f2f2f2",
  fontSize: 16,
 },
});
