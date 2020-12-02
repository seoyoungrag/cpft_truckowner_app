import axios from "axios";
import jwt from "jwt-decode";

axios.interceptors.request.use((request) => {
	//console.log("Starting Request", request);
	return request;
});
axios.interceptors.request.use((request) => {
	//console.log("Starting Request", request);
	return request;
});

const url = "https://blueapi.teamfresh.co.kr/v1/signin/";
// const url = "http://172.126.11.154:19201/v1/signin/";

export const LOG_IN = ({userLoginId, userLoginPw}) => {
	return new Promise(function (resolve, reject) {
		axios
			.post(url, null, {
				params: {
					id: userLoginId,
					password: userLoginPw,
				},
			})
			.then((result) => {
				const {data} = result.data;
				console.log(data);
				const user = jwt(data); // decode your token here
				const token = data;
				user.token = token;
				resolve({data: user});
			})
			.catch((error) => {
				console.error(error);
				reject(error);
			});
	});
};
