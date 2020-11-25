import React, { createContext, useContext, useState } from "react";
import * as Permissions from "expo-permissions";

export const PermissionContext = createContext();

export const PermissionProvider = ({
 hasCameraPermission: hasCameraPermissionProp,
 hasPhonePermission: hasPhonePermissionProp,
 hasFilePermission: hasFilePermissionProp,
 children,
}) => {
 const [hasCameraPermission, setHasCameraPermission] = useState(
  hasCameraPermissionProp
 );
 const [hasPhonePermission, setHasPhonePermission] = useState(
  hasPhonePermissionProp
 );
 const [hasFilePermission, setHasFilePermission] = useState(
  hasFilePermissionProp
 );
 const requestCameraPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  setHasCameraPermission(status);
 };
 const requestPhonePermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  setHasPhonePermission(status);
 };
 const requestFilePermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  setHasFilePermission(status);
 };
 const getCameraPermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.CAMERA);
  setHasCameraPermission(status);
  return status;
 };
 const getPhonePermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.CONTACTS);
  setHasPhonePermission(status);
  return status;
 };
 const getFilePermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  setHasFilePermission(status);
  return status;
 };
 React.useEffect(() => {
    getCameraPermission();
    getPhonePermission();
    getFilePermission();
 }, []);
 return (
  <PermissionContext.Provider
   value={{
    hasCameraPermission,
    hasPhonePermission,
    hasFilePermission,
    requestCameraPermission,
    requestPhonePermission,
    requestFilePermission,
    getCameraPermission,
    getPhonePermission,
    getFilePermission,
   }}
  >
   {children}
  </PermissionContext.Provider>
 );
};

export const useHasCameraPermission = () => {
 const { hasCameraPermission } = useContext(PermissionContext);
 return hasCameraPermission;
};

export const useHasPhonePermission = () => {
 const { hasPhonePermission } = useContext(PermissionContext);
 return hasPhonePermission;
};

export const useHasFilePermission = () => {
 const { hasFilePermission } = useContext(PermissionContext);
 return hasFilePermission;
};

export const useRequestCameraPermission = () => {
 const { requestCameraPermission } = useContext(PermissionContext);
 return requestCameraPermission;
};

export const useRequestPhonePermission = () => {
 const { requestPhonePermission } = useContext(PermissionContext);
 return requestPhonePermission;
};

export const useRequestFilePermission = () => {
 const { requestFilePermission } = useContext(PermissionContext);
 return requestFilePermission;
};

export const useGetCameraPermission = () => {
 const { getCameraPermission } = useContext(PermissionContext);
 return getCameraPermission;
};

export const useGetPhonePermission = () => {
 const { getPhonePermission } = useContext(PermissionContext);
 return getPhonePermission;
};

export const useGetFilePermission = () => {
 const { getFilePermission } = useContext(PermissionContext);
 return getFilePermission;
};
