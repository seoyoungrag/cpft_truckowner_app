import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const CodeContext = createContext();

export const CodeProvider = ({ codes: codesProp, children }) => {
 const [codes, setCodes] = useState(codesProp);
 const setCodesProp = async (codes) => {
  setCodes(codes);
 };

 return (
  <CodeContext.Provider value={{ codes, setCodesProp }}>
   {children}
  </CodeContext.Provider>
 );
};

export const useCodes = () => {
 const { codes } = useContext(CodeContext);
 return codes;
};

export const useSetCodesProp = () => {
 const { setCodesProp } = useContext(CodeContext);
 return setCodesProp;
};
