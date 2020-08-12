/*
 * @Author: ashoka
 * @Date: 2018-05-20 14:40:24
 */
import React, { Component } from "react";
import {
 View,
 Picker,
 Text,
 TouchableOpacity,
 StyleSheet,
 Dimensions,
 Modal,
} from "react-native";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

export default class YearMonthPicker extends Component {
 constructor(props) {
  super(props);
  let { startYear, endYear, selectedYear, selectedMonth, visiable } = props;
  let years = this.getYears(startYear, endYear);
  let months = this.getMonths();
  selectedYear = selectedYear || years[0];
  selectedMonth = selectedMonth || new Date().getMonth() + 1;
  this.state = {
   years,
   months,
   selectedYear,
   selectedMonth,
   visiable: visiable || false,
  };
 }

 show = async ({ startYear, endYear, selectedYear, selectedMonth }) => {
  let years = this.getYears(startYear, endYear);
  let months = this.getMonths();
  selectedYear = selectedYear || years[0];
  selectedMonth = selectedMonth || new Date().getMonth() + 1;
  let promise = new Promise((resolve) => {
   this.confirm = (year, month) => {
    resolve({
     year,
     month,
    });
   };
   this.setState({
    visiable: true,
    years,
    months,
    startYear: startYear,
    endYear: endYear,
    selectedYear: selectedYear,
    selectedMonth: selectedMonth,
   });
  });
  return promise;
 };

 dismiss = () => {
  if (this.props.dismissFnc) {
   this.props.dismissFnc();
  }
  this.setState({
   visiable: false,
  });
 };

 getYears = (startYear, endYear) => {
  startYear = startYear || new Date().getFullYear();
  endYear = endYear || new Date().getFullYear();
  let years = [];
  for (let i = startYear; i <= endYear; i++) {
   years.push(i);
  }
  return years;
 };

 getMonths = () => {
  let months = [];
  for (let i = 1; i <= 12; i++) {
   months.push(i);
  }
  return months;
 };

 renderPickerItems = (data) => {
  let items = data.map((value, index) => {
   return <Picker.Item key={"r-" + index} label={"" + value} value={value} />;
  });
  return items;
 };

 onCancelPress = () => {
  this.dismiss();
 };

 onConfirmPress = () => {
  const confirm = this.confirm;
  const { selectedYear, selectedMonth } = this.state;
  confirm && confirm(selectedYear, selectedMonth);
  this.dismiss();
 };

 render() {
  const { years, months, selectedYear, selectedMonth, visiable } = this.state;
  if (!visiable) return null;
  return (
   <View style={styles.outerContainer}>
    <View style={styles.toolBar}>
     <TouchableOpacity
      style={styles.toolBarButton}
      onPress={this.onCancelPress}
     >
      <Text style={styles.toolBarButtonText}>취소</Text>
     </TouchableOpacity>
     <View style={{ flex: 1 }} />
     <TouchableOpacity
      style={styles.toolBarButton}
      onPress={this.onConfirmPress}
     >
      <Text style={styles.toolBarButtonText}>확인</Text>
     </TouchableOpacity>
    </View>
    <View style={styles.innerContainer}>
     <Picker
      style={styles.picker}
      selectedValue={selectedYear}
      onValueChange={(itemValue, itemIndex) =>
       this.setState({ selectedYear: itemValue })
      }
     >
      {this.renderPickerItems(years)}
     </Picker>
     <Picker
      style={styles.picker}
      selectedValue={selectedMonth}
      onValueChange={(itemValue, itemIndex) =>
       this.setState({ selectedMonth: itemValue })
      }
     >
      {this.renderPickerItems(months)}
     </Picker>
    </View>
   </View>
  );
 }
}

const styles = StyleSheet.create({
 modal: {},
 outerContainer: {
  flex: 1,
  width: ScreenWidth,
  backgroundColor: "rgba(0,0,0,0)",
  justifyContent: "center",
  alignItems: "center",
 },
 toolBar: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: 44,
  borderBottomWidth: 1,
  borderColor: "#EBECED",
  backgroundColor: "white",
 },
 toolBarButton: {
  height: 44,
  justifyContent: "center",
  paddingHorizontal: 16,
 },
 toolBarButtonText: {
  fontSize: 15,
  color: "#2d4664",
 },
 innerContainer: {
  flex: 0,
  flexDirection: "row",
  backgroundColor: "white",
 },
 picker: {
  flex: 1,
 },
});
