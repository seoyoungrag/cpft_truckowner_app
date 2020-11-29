import React, {createContext, useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
	const [token, setToken] = React.useState(null);

	const logUserIn = async (token) => {
		try {
			console.log("토큰", token);
			await AsyncStorage.setItem("isLoggedIn", "true");
			await AsyncStorage.setItem("jwt", token);
			setToken(token);
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
			console.error(e);
		}
	};

	const getToken = async () => {
		try {
			const value = await AsyncStorage.getItem("jwt");
			setToken(value);
		} catch (e) {
			console.error(e);
		}
	};

	React.useEffect(() => {
		getToken();
		getIsLoggedIn();
	}, []);

	return <AuthContext.Provider value={{isLoggedIn, logUserIn, logUserOut, getIsLoggedIn, setIsLoggedIn, token}}>{children}</AuthContext.Provider>;
};

export const useToken = () => {
	const {token} = useContext(AuthContext);
	return token;
};

export const useIsLoggedIn = () => {
	const {isLoggedIn} = useContext(AuthContext);
	return isLoggedIn;
};

export const useGetIsLoggedIn = () => {
	const {getIsLoggedIn} = useContext(AuthContext);
	return getIsLoggedIn;
};
export const useLogIn = () => {
	const {logUserIn} = useContext(AuthContext);
	return logUserIn;
};

export const useLogOut = () => {
	const {logUserOut} = useContext(AuthContext);
	return logUserOut;
};

export const useSetIsLoggedIn = () => {
	const {setIsLoggedIn} = useContext(AuthContext);
	return setIsLoggedIn;
};
