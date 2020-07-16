import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "react-native";
import Title from "./Title";

const HorizontalSlider = ({ title, children }) => (
 <View>
  <Title title={title} />
  <ScrollView
   contentContainerStyle={{ paddingLeft: 30 }}
   horizontal
   showsHorizontalScrollIndicator={false}
   style={{ marginTop: 20, marginBottom: 40 }}
  >
   {children}
  </ScrollView>
 </View>
);
HorizontalSlider.propTypes = {
 title: PropTypes.string.isRequired,
 childeren: PropTypes.node.isRequired,
};

export default HorizontalSlider;
