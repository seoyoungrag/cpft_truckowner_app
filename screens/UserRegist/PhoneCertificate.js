import React from "react";
import IMP from "iamport-react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import Loading from "./Loading";
import { View, Text } from "react-native";

const statusHeight = getStatusBarHeight();

export default function PhoneCertificate({ navigation, route }) {
 const params = route.params.params;

 return (
  <>
   <View style={{ height: statusHeight }}></View>
   <IMP.Certification
    style={{ padding: 100 }}
    userCode={"imp10391932"}
    //imp21576986
    loading={<Loading />}
    data={params}
    callback={(response) =>
     //navigation.replace("PhoneCertificateResult", { response })
     navigation.replace("UserStep2", { response })
    }
   />
  </>
 );
}
