import React, { useState, useEffect } from "react";

import { Image, Dimensions, Text, StyleSheet, Animated } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { codeApi } from "./api";

const { width } = Dimensions.get("screen");
const statusBarHeight = getStatusBarHeight();

const BackendHealthCheck = ({ updateModalVisible }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);

  const syncImmediate = async () => {
    const [codes, codesErr] = await codeApi.codes();
    if (codesErr) {
      setSyncMessage("네트워크 및 서버 장애로, 정상작동하지 않을 수 있습니다.");
    } else {
      setSyncMessage("서버 동기화 완료");
      fadeOutAnimation();
    }
  };

  const fadeOutAnimation = () => {
    Animated.timing(animatedHeight, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      delay: 1000
    }).start();
    setTimeout(() => {
      setModalVisible(false);
      Animated.timing(animatedHeight, {
        toValue: -1,
        duration: 0,
        useNativeDriver: true
      }).start();
    }, 1500);
  };
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    if (updateModalVisible === false) {
      setSyncMessage("서버 동기화 중");
    }
    setModalVisible(updateModalVisible);
  }, [updateModalVisible]);
  useEffect(() => {
    if (modalVisible) {
      syncImmediate();
    } else {
    }
  }, [modalVisible]);
  return (
    <Animated.View
      style={[
        styles.container,
        modalVisible
          ? { height: statusBarHeight }
          : {
              height: 0
            },
        {
          transform: [
            {
              translateX: animatedHeight.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 0, width]
              })
            }
          ]
        }
      ]}
    >
      <Image style={styles.image} resizeMode={"contain"} source={require("./assets/launcher.png")} />
      <Text style={styles.messages}>{syncMessage || ""}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  image: {
    marginLeft: statusBarHeight / 2,
    width: statusBarHeight,
    height: statusBarHeight,
    transform: [{ rotateY: "180deg" }]
  },
  messages: {
    textAlign: "center"
  },
  restartToggleButton: {
    color: "blue",
    fontSize: 17
  },
  syncButton: {
    color: "green",
    fontSize: 17
  },
  welcome: {
    paddingHorizontal: 10,
    textAlign: "center"
  }
});

export default BackendHealthCheck;
