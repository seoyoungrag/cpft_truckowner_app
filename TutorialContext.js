import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const TutorialContext = createContext();

export const TutorialProvider = ({
 hasTutorialPass: hasTutorialPassProp,
 children,
}) => {
 const [hasTutorialPass, setHasTutorialPass] = useState(hasTutorialPassProp);
 const getHasTutorialPass = async () => {
  const value = await AsyncStorage.getItem("hasTutorialPass");
  setHasTutorialPass(value);
 };
 const tutorialPass = async (token) => {
  try {
   await AsyncStorage.setItem("hasTutorialPass", "true");
   setHasTutorialPass(true);
  } catch (e) {
   console.log(e);
  }
 };
 React.useEffect(() => {
    getHasTutorialPass();
 }, []);
 return (
  <TutorialContext.Provider
   value={{
    hasTutorialPass,
    tutorialPass,
   }}
  >
   {children}
  </TutorialContext.Provider>
 );
};

export const useTutorialPass = () => {
 const { tutorialPass } = useContext(TutorialContext);
 return tutorialPass;
};

export const useHasTutorialPass = () => {
 const { hasTutorialPass } = useContext(TutorialContext);
 return hasTutorialPass;
};
