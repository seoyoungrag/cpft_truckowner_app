import React from "react";
import {
 createStackNavigator,
 HeaderBackButton,
} from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Detail from "../screens/Detail";
import Filter from "../screens/Filter";
import Tabs from "./Tabs";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "./AuthNavigation";
import PermissionNavigation from "./PermissionNavigation";
import { TouchableOpacity, Text } from "react-native";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import UserRegistNavigation from "./UserRegistNavigation";
import {
 useHasCameraPermission,
 useHasFilePermission,
 useHasPhonePermission,
} from "../PermissionContext";
import TutorialNavigation from "./TutorialNavigation";
import { useHasTutorialPass } from "../TutorialContext";
import {
 useGetUserRegistInfo,
 useSetUserRegistInfo,
 useUserRegistInfo,
} from "../UserRegistContext";
import { FontAwesome5 } from "@expo/vector-icons";
import UserStep4 from "../screens/UserRegist/UserStep4";
import UserStep4AddrFindView from "../screens/UserRegist/UserStep4AddrFindView";
import OrderDetail from "../screens/OrderDetail";
import TransDetail from "../screens/TransDetail";
import DtStmn from "../screens/DtStmn";
import TaxInvoice from "../screens/TaxInvoice";
import MyInfoEdit from "../screens/MyInfoEdit";
import MyInfoDetailEdit from "../screens/MyInfoEdit/MyInfoDetailEdit";
import MyInfoDocumentsNavigation from "./MyInfoDocumentsNavigation";
import TaxBillDetail from "../screens/TaxBill/TaxBillDetail";
import DocketForm from "../screens/DocketForm/DocketForm";

const Stack = createStackNavigator();

const config = {
 animation: "spring",
 config: {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
 },
};

const forFade = ({ current, closing }) => ({
 cardStyle: {
  opacity: current.progress,
 },
});

export default () => {
 const isLoggedIn = useIsLoggedIn();
 const hasCameraPermission = useHasCameraPermission();
 const hasPhonePermission = useHasPhonePermission();
 const hasFilePermission = useHasFilePermission();
 //  console.log(hasCameraPermission, hasPhonePermission, hasFilePermission);
 //const isLoggedIn = true;
 const logIn = useLogIn();
 const logOut = useLogOut();
 const hasTutorialPass = useHasTutorialPass();
 const userRegistInfo = useUserRegistInfo();
 //return <UserRegistNavigation />;
 return !isLoggedIn ? (
  hasCameraPermission != "undetermined" &&
  hasPhonePermission != "undetermined" &&
  hasFilePermission != "undetermined" ? (
   !hasTutorialPass ? (
    !userRegistInfo?.userNm &&
    !userRegistInfo?.userBirthDate &&
    !userRegistInfo?.userSex &&
    !userRegistInfo?.userHPAuthAgree &&
    !userRegistInfo?.userPHNumber &&
    !userRegistInfo?.userPattern &&
    !userRegistInfo?.userServiceAuthAgree &&
    !userRegistInfo?.userRegistComplete ? (
     <AuthNavigation />
    ) : (
     <UserRegistNavigation />
    )
   ) : (
    <TutorialNavigation />
   )
  ) : (
   <PermissionNavigation />
  )
 ) : (
  <NavigationContainer independent={true}>
   <Stack.Navigator
    mode="modal"
    screenOptions={{
     gestureEnabled: true,
     headerStyle: {
      backgroundColor: "#3e50b4",
      shadowColor: "#3e50b4",
      borderBottomColor: "#3e50b4",
     },
     headerTintColor: "white",
     headerBackTitleVisible: false,
     headerShown: false,
    }}
   >
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="Detail" component={Detail} />
    <Stack.Screen
     name="Filter"
     component={Filter}
     options={{
      headerTitleStyle: {
       textAlign: "center",
       marginLeft: -20,
       paddingLeft: 0,
       fontSize: 24,
       color: "white",
      },
      /*
       headerLeft: (props) => (
        <HeaderBackButton
         {...props}
         onPress={() => {
          // Do something
         }}
        ></HeaderBackButton>
       ),*/
      headerTintColor: "white",
      headerBackTitleVisible: false,
      headerShown: true,
      headerTitle: (props) => (
       <Text {...props}>
        필터{" "}
        <FontAwesome5
         name="filter"
         size={24}
         color="white"
         style={{
          marginLeft: 10,
         }}
        />
       </Text>
      ),
     }}
    />
    <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
    <Stack.Screen name="MessageNavigation" component={MessageNavigation} />
    <Stack.Screen
     name="추가정보입력"
     component={UserStep4}
     options={{
      transitionSpec: {
       open: config,
       close: config,
      },
      cardStyleInterpolator: forFade,
      headerShown: false,
     }}
    />
    <Stack.Screen
     name="OrderDetail"
     component={OrderDetail}
     options={{
      headerShown: false,
     }}
    />
    <Stack.Screen
     name="TransDetail"
     component={TransDetail}
     options={{
      headerShown: false,
     }}
    />
    <Stack.Screen name="DtStmn" component={DtStmn} />
    <Stack.Screen name="TaxInvoice" component={TaxInvoice} />
    <Stack.Screen name="MyInfoEdit" component={MyInfoEdit} />
    <Stack.Screen
     name="MyInfoDocuments"
     component={MyInfoDocumentsNavigation}
    />
    <Stack.Screen name="MyInfoDetailEdit" component={MyInfoDetailEdit} />
    <Stack.Screen name="TaxBillDetail" component={TaxBillDetail}/>
    <Stack.Screen name="DocketForm" component={DocketForm}/>
   </Stack.Navigator>
  </NavigationContainer>
 );
};
