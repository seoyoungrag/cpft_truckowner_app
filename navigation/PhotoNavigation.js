import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const PhotoTabs = createMaterialTopTabNavigator();
const PhotoStacks = createStackNavigator();

const PhotoTabsImpl = () => (
 <PhotoTabs.Navigator tabBarPosition="bottom">
  <PhotoTabs.Screen name="SelectPhoto" component={SelectPhoto} />
  <PhotoTabs.Screen name="TakePhoto" component={TakePhoto} />
 </PhotoTabs.Navigator>
);

export default () => (
 <PhotoStacks.Navigator>
  <PhotoStacks.Screen name="photoTabs" component={PhotoTabsImpl} />
  <PhotoStacks.Screen name="UploadPhoto" component={UploadPhoto} />
 </PhotoStacks.Navigator>
);
