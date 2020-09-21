import React from "react";
import IMP from "iamport-react-native";
import Loading from "./Loading";

export default function PhoneCertificate({ navigation, route }) {
 const params = route.params.params;

 return (
  <>
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
