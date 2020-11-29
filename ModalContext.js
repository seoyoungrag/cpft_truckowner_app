import React, {createContext, useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ModalContext = createContext();

export const ModalProvider = ({isModal: isModalProp, children}) => {
	const [isModal, setIsModal] = useState(isModalProp);
	const setIsModalProp = async (isModal) => {
		setIsModal(isModal);
	};

	return <ModalContext.Provider value={{isModal, setIsModalProp}}>{children}</ModalContext.Provider>;
};

export const useIsModal = () => {
	const {isModal} = useContext(ModalContext);
	return isModal;
};

export const useSetIsModalProp = () => {
	const {setIsModalProp} = useContext(ModalContext);
	return setIsModalProp;
};
