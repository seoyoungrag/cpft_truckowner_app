import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
 const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
 const logUserIn = async (token) => {
  try {
   await AsyncStorage.setItem("isLoggedIn", "true");
   await AsyncStorage.setItem("jwt", token);
   setIsLoggedIn(true);
  } catch (e) {
   console.log(e);
  }
 };

 const logUserOut = async () => {
  try {
   await AsyncStorage.setItem("isLoggedIn", "false");
   setIsLoggedIn(false);
  } catch (e) {
   console.log(e);
  }
 };

 const getIsLoggedIn = async () => {
  try {
    const value = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(value);
   } catch (e) {
    console.log(e);
   }
 }

 React.useEffect(() => {
    getIsLoggedIn();
 }, []);
 return (
  <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut, getIsLoggedIn }}>
   {children}
  </AuthContext.Provider>
 );
};

export const useIsLoggedIn = () => {
 const { isLoggedIn } = useContext(AuthContext);
 return isLoggedIn;
};

export const useGetIsLoggedIn = () => {
    const { getIsLoggedIn } = useContext(AuthContext);
    return getIsLoggedIn;
}
export const useLogIn = () => {
 const { logUserIn } = useContext(AuthContext);
 return logUserIn;
};

export const useLogOut = () => {
 const { logUserOut } = useContext(AuthContext);
 return logUserOut;
};
