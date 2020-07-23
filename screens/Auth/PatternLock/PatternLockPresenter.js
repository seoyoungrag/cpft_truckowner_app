import React, { useState, useEffect } from "react";
import {
 StyleSheet,
 Text,
 View,
 Animated,
 PanResponder,
 Alert,
} from "react-native";
import Svg, { Line, Circle } from "react-native-svg";
import constants from "../../../constants";

const DEFAULT_DOT_RADIUS = 8;
const SNAP_DOT_RADIUS = 10;
const SNAP_DURATION = 100;

export default ({
 containerDimension,
 containerWidth,
 containerHeight,
 correctPattern,
 onPatternMatch,
 hint,
 onMatchedPattern
}) => {
  const [snap, setSnap] = useState(null);
 const [initialGestureCoordinate, setInitialGestureCoordinate] = useState(null);
 const [activeDotCoordinate, setActiveDotCoordinate] = useState(null);
 const [pattern, setPattern] = useState([]);
 const [showError, setShowError] = useState(false);
 const [showHint, setShowHint] = useState(false);

 let { screenCoordinates, mappedIndex } = constants.populateDotsCoordinate(
  containerDimension,
  containerWidth,
  containerHeight
 );

 let _dots = screenCoordinates;
 let _mappedDotsIndex = mappedIndex;
 let _dotNodes = [];

 let _activeLine;

 const _snapAnimatedValues = _dots.map((dot, index) => {
  let animatedValue = new Animated.Value(DEFAULT_DOT_RADIUS);
  animatedValue.addListener(({ value }) => {
   let dotNode = _dotNodes[index];
   dotNode && dotNode.setNativeProps({ r: value.toString() });
  });
  return animatedValue;
 });

 let _resetTimeout;
 const _snapDot = (animatedValue) => {
  Animated.sequence([
   Animated.timing(animatedValue, {
    toValue: SNAP_DOT_RADIUS,
    duration: SNAP_DURATION,
   }),
   Animated.timing(animatedValue, {
    toValue: DEFAULT_DOT_RADIUS,
    duration: SNAP_DURATION,
   }),
  ]).start();
 };

 const _isAlreadyInPattern = ({ x, y }) => {
  return pattern.find((dot) => {
   return dot.x === x && dot.y === y;
  }) == null
   ? false
   : true;
 };

 const _isPatternMatched = (currentPattern) => {
  if (currentPattern.length !== correctPattern.length) {
   return false;
  }
  let matched = true;
  for (let index = 0; index < currentPattern.length; index++) {
   let correctDot = correctPattern[index];
   let currentDot = currentPattern[index];
   if (correctDot.x !== currentDot.x || correctDot.y !== currentDot.y) {
    matched = false;
    break;
   }
  }
  return matched;
 };

 let endGestureX;
 let endGestureY;

 const _panResponder = PanResponder.create({
  onMoveShouldSetResponderCapture: () => !showError,
  onMoveShouldSetPanResponderCapture: () => !showError,

  onPanResponderGrant: (e) => {
   let { locationX, locationY } = e.nativeEvent;

   let activeDotIndex = constants.getDotIndex(
    { x: locationX, y: locationY },
    _dots
   );

   if (activeDotIndex != null) {
    let activeDotCoordinate = _dots[activeDotIndex.i];
    let firstDot = _mappedDotsIndex[activeDotIndex.i];
    let dotWillSnap = _snapAnimatedValues[activeDotIndex.i];
    
   endGestureX += activeDotIndex.x;
   endGestureY += activeDotIndex.y;
    setActiveDotCoordinate(activeDotCoordinate);
    setInitialGestureCoordinate(activeDotCoordinate);
    setPattern([firstDot]);
    //_snapDot(dotWillSnap);
    console.log(activeDotIndex.i)
    setSnap([activeDotIndex.i]);
    //console.log(activeDotCoordinate);
   }
  },
  onPanResponderMove: (e, gestureState) => {
   let { dx, dy } = gestureState;
//console.log(dx, dy, endGestureX, endGestureY);
   if (activeDotCoordinate == null || initialGestureCoordinate == null) {
    return;
   }

   endGestureX = activeDotCoordinate.x+dx;
   endGestureY = activeDotCoordinate.y+dy;

   let matchedDotIndex = constants.getDotIndex(
    { x: endGestureX, y: endGestureY },
    _dots
   );
//console.log(matchedDotIndex);
   let matchedDot =
    matchedDotIndex.i != null && _mappedDotsIndex[matchedDotIndex.i];

   if (
    matchedDotIndex.i != null &&
    matchedDot &&
    !_isAlreadyInPattern(matchedDot)
   ) {
    let newPattern = {
     x: matchedDot.x,
     y: matchedDot.y,
    };

    let intermediateDotIndexes = [];

    if (pattern.length > 0) {
     intermediateDotIndexes = constants.getIntermediateDotIndexes(
      pattern[pattern.length - 1],
      newPattern,
      containerDimension
     );
    }

    let filteredIntermediateDotIndexes = intermediateDotIndexes.filter(
     (index) => !_isAlreadyInPattern(_mappedDotsIndex[index])
    );

    filteredIntermediateDotIndexes.forEach((index) => {
     let mappedDot = _mappedDotsIndex[index];
     pattern.push({ x: mappedDot.x, y: mappedDot.y });
    });

    pattern.push(newPattern);

    let animateIndexes = [...filteredIntermediateDotIndexes, matchedDotIndex.i];

    setPattern(pattern);
    //console.log(_dots[matchedDotIndex]);
    setActiveDotCoordinate(_dots[matchedDotIndex.i]);

    
      //console.log('1');
     if (animateIndexes.length) {
      setSnap(animateIndexes);
      /*
      animateIndexes.forEach((index) => {
       _snapDot(_snapAnimatedValues[index]);
      });
     */
     }

    
   endGestureX += matchedDotIndex.x;
   endGestureY += matchedDotIndex.y;
   } else {
    _activeLine &&
     _activeLine.setNativeProps({
      x2: endGestureX.toString(),
      y2: endGestureY.toString(),
     });
   }
  },
  onPanResponderRelease: () => {
   if (pattern.length) {
    if (_isPatternMatched(pattern)) {
     setInitialGestureCoordinate(null);
     setActiveDotCoordinate(null);
     
      Alert.alert(
       "",
       "설정 오케이!",
       [{ text: "OK", onPress: onPatternMatch }],
       { cancelable: false }
      );
      onMatchedPattern();
    } else {
     setInitialGestureCoordinate(null);
     setActiveDotCoordinate(null);
     setShowError(true);
    }
   }
  },
 });

 let message;
 if (showHint) {
  message = `hint: ${hint}`;
 } else if (showError) {
  message = "Wrong Pattern";
 }

 useEffect(() => {
   if(showError){

    _resetTimeout = setTimeout(() => {
      setShowHint(true);
      setShowError(false);
      setPattern([]);
     }, 2000);
    
   }
   //console.log(snap);
   if(snap?.length){     
     snap.map((obj) => {
      _snapDot(_snapAnimatedValues[obj]);
     });
   }
  return () => {
   clearTimeout(_resetTimeout);
  };
 },[showError, snap]);
 return (
  <View style={styles.container}>
   <View style={styles.hintContainer}>
    <Text style={styles.hintText}>{message}</Text>
   </View>
   <Animated.View {..._panResponder.panHandlers}>
    <Svg height={containerHeight} width={containerWidth}>
     {_dots.map((dot, i) => {
      let mappedDot = _mappedDotsIndex[i];
      let isIncludedInPattern = pattern.find(
       (dot) => dot.x === mappedDot.x && dot.y === mappedDot.y
      );
      return (
       <Circle
        ref={(circle) => (_dotNodes[i] = circle)}
        key={i}
        cx={dot.x}
        cy={dot.y}
        r={DEFAULT_DOT_RADIUS}
        fill={(showError && isIncludedInPattern && "red") || "white"}
       />
      );
     })}
     {pattern.map((startCoordinate, index) => {
      if (index === pattern.length - 1) {
       return;
      }
      let startIndex = _mappedDotsIndex.findIndex((dot) => {
       return dot.x === startCoordinate.x && dot.y === startCoordinate.y;
      });
      let endCoordinate = pattern[index + 1];
      let endIndex = _mappedDotsIndex.findIndex((dot) => {
       return dot.x === endCoordinate.x && dot.y === endCoordinate.y;
      });

      if (startIndex < 0 || endIndex < 0) {
       return;
      }

      let actualStartDot = _dots[startIndex];
      let actualEndDot = _dots[endIndex];

      return (
       <Line
        key={`fixedLine${index}`}
        x1={actualStartDot.x}
        y1={actualStartDot.y}
        x2={actualEndDot.x}
        y2={actualEndDot.y}
        stroke={showError ? "red" : "white"}
        strokeWidth="2"
       />
      );
     })}
     {activeDotCoordinate ? (
      <Line
       ref={(component) => (_activeLine = component)}
       x1={activeDotCoordinate.x}
       y1={activeDotCoordinate.y}
       x2={activeDotCoordinate.x}
       y2={activeDotCoordinate.y}
       stroke="red"
       strokeWidth="2"
      />
     ) : null}
    </Svg>
   </Animated.View>
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "transparent",
  alignItems: "center",
  justifyContent: "center",
 },
 hintContainer: {
  alignItems: "center",
  paddingBottom: 10,
  height: 20,
  flexWrap: "wrap",
 },
 hintText: {
  color: "white",
  textAlign: "center",
 },
});