import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, ActivityIndicator, RefreshControl } from "react-native";

const ScrollContainer = ({
 loading,
 children,
 contentContainerStyle,
 refreshFn,
}) => {
 const [refreshing, setRefreshing] = useState(false);
 const onRefresh = async () => {
  setRefreshing(true);
  await refreshFn();
  setRefreshing(false);
 };
 return (
  <ScrollView
   refreshControl={
    <RefreshControl
     refreshing={refreshing}
     onRefresh={onRefresh}
     color={"white"}
    />
   }
   style={{ backgroundColor: "black" }}
   contentContainerStyle={{
    flex: loading ? 1 : 0,
    justifyContent: loading ? "center" : "flex-start",
    ...contentContainerStyle,
   }}
  >
   {loading ? <ActivityIndicator color="white" size="large" /> : children}
  </ScrollView>
 );
};

ScrollContainer.propTypes = {
 loading: PropTypes.bool.isRequired,
 children: PropTypes.node.isRequred,
 contentContainerStyle: PropTypes.object,
 refreshFn: PropTypes.func,
};
export default ScrollContainer;
