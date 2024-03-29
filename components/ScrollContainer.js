import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, ActivityIndicator, RefreshControl } from "react-native";

const ScrollContainer = ({
 loading,
 children,
 contentContainerStyle,
 refreshFn,
 refreshOn,
 scrollEnabled,
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
    !refreshOn ? null : (
     <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      color={"white"}
     />
    )
   }
   style={{
    backgroundColor: contentContainerStyle?.backgroundColor
     ? contentContainerStyle.backgroundColor
     : "transparent",
   }}
   contentContainerStyle={{
    flex: loading ? 1 : 0,
    justifyContent: loading ? "center" : "flex-start",
    ...contentContainerStyle,
   }}
   persistentScrollbar={true}
   showsVerticalScrollIndicator={true}
  >
   {loading ? <ActivityIndicator color="#3e50b4" size="large" /> : children}
  </ScrollView>
 );
};

ScrollContainer.propTypes = {
 loading: PropTypes.bool.isRequired,
 children: PropTypes.node,
 contentContainerStyle: PropTypes.object,
 refreshFn: PropTypes.func,
 scrollEnabled: PropTypes.bool,
};
export default ScrollContainer;
