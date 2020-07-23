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

const DEFAULT_DOT_RADIUS = 5;
const SNAP_DOT_RADIUS = 10;
const SNAP_DURATION = 100;

export default ({
 containerDimension,
 containerWidth,
 containerHeight,
 correctPattern,
 onPatternMatch,
}) => {
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
    let activeDotCoordinate = _dots[activeDotIndex];
    let firstDot = _mappedDotsIndex[activeDotIndex];
    let dotWillSnap = _snapAnimatedValues[activeDotIndex];
    setActiveDotCoordinate(activeDotCoordinate);
    setInitialGestureCoordinate(activeDotCoordinate);
    setPattern([firstDot]);
    _snapDot(dotWillSnap);
   }
  },
  onPanResponderMove: (e, gestureState) => {
   let { dx, dy } = gestureState;

   if (activeDotCoordinate == null || initialGestureCoordinate == null) {
    return;
   }

   let endGestureX = initialGestureCoordinate.x + dx;
   let endGestureY = initialGestureCoordinate.y + dy;

   let matchedDotIndex = constants.getDotIndex(
    { x: endGestureX, y: endGestureY },
    _dots
   );

   let matchedDot =
    matchedDotIndex != null && _mappedDotsIndex[matchedDotIndex];

   if (
    matchedDotIndex != null &&
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

    let animateIndexes = [...filteredIntermediateDotIndexes, matchedDotIndex];

    setPattern(pattern);
    setActiveDotCoordinate(_dots[matchedDotIndex]);

    () => {
     if (animateIndexes.length) {
      animateIndexes.forEach((index) => {
       _snapDot(_snapAnimatedValues[index]);
      });
     }
    };
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
     () => {
      Alert.alert(
       "",
       "설정 오케이!",
       [{ text: "OK", onPress: onPatternMatch }],
       { cancelable: false }
      );
     };
    } else {
     setInitialGestureCoordinate(null);
     setActiveDotCoordinate(null);
     setShowError(true);
     () => {
      _resetTimeout = setTimeout(() => {
       setShowHint(true);
       setShowError(false);
       setPattern([]);
      }, 2000);
     };
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
  return () => {
   clearTimeout(_resetTimeout);
  };
 });
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
