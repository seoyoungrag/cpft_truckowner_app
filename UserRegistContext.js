import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const UserRegistContext = createContext();

export const UserRegistProvider = ({
 userRegistInfo: userRegistInfoProp,
 children,
}) => {
 const [userRegistInfo, setUserRegistInfoProp] = useState(userRegistInfoProp);
 const getUserRegistInfo = async () => {
  try {
   const value = await AsyncStorage.getItem("userRegistInfo");
   setUserRegistInfoProp(JSON.parse(value));
  } catch (e) {
   console.log(e);
   setUserRegistInfoProp(null);
  }
 };
 const setUserRegistInfo = async (value) => {
  try {
   const value = await AsyncStorage.setItem(
    "userRegistInfo",
    JSON.stringify(value)
   );
  } catch (e) {
   console.log(e);
  }
 };
 return (
  <UserRegistContext.Provider
   value={{
    useUserRegistInfo,
    useGetUserRegistInfo,
    useSetUserRegistInfo,
   }}
  >
   {children}
  </UserRegistContext.Provider>
 );
};

export const useUserRegistInfo = () => {
 const { userRegistInfo } = useContext(UserRegistContext);
 return userRegistInfo;
};

export const useGetUserRegistInfo = () => {
 const { getUserRegistInfo } = useContext(UserRegistContext);
 return getUserRegistInfo;
};

export const useSetUserRegistInfo = () => {
 const { setUserRegistInfo } = useContext(UserRegistContext);
 return setUserRegistInfo;
};
