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

export const LOG_IN = ({ userLoginId, userLoginPw }) => {
 return new Promise(function (resolve, reject) {
  axios
   .post(`http://52.78.103.218/v1/signin/`, null, {
    params: {
     id: userLoginId,
     password: userLoginPw,
    },
   })
   .then((result) => {
    const { data } = result.data;
    console.log(data);
    const user = jwt(data); // decode your token here
    const token = data;
    user.token = token;
    resolve({ data: user });
   })
   .catch((error) => {
    console.error(error);
    reject(error);
   });
 });
};
