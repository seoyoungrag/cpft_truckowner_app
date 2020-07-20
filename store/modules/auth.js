import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";
import jwt from "jwt-decode";

const INITIALIZE_INPUT = "auth/INITIALIZE_INPUT";

const CHANGE_INPUT = "auth/CHANGE_INPUT";
const REGISTER = "auth/REGISTER";
const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

const INITIALIZE_ERROR = "auth/INITIALIZE_ERROR";

const CHECK_USER = "auth/CHECK_USER";
const CHECK_USER_SUCCESS = "auth/CHECK_USER_SUCCESS";
const CHECK_USER_FAILURE = "auth/CHECK_USER_FAILURE";

const SET_USER_TEMP = "auth/SET_USER_TEMP";

const LOGOUT = "auth/LOGOUT";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";

export const logout = () => ({
 type: LOGOUT,
});

export const logoutSuccess = () => ({
 type: LOGOUT_SUCCESS,
});

export const logoutFailure = () => ({
 type: LOGOUT_FAILURE,
});

export const checkUser = () => ({
 type: CHECK_USER,
});

export const checkUserSuccess = () => ({
 type: CHECK_USER_SUCCESS,
});

export const checkUserFailure = (error) => ({
 type: CHECK_USER_FAILURE,
 payload: {
  error,
 },
});

export const setUserTemp = ({
 carrierSeq,
 userSeq,
 userLoginId,
 userNm,
 userEmail,
 token,
}) => ({
 type: SET_USER_TEMP,
 payload: {
  carrierSeq,
  userSeq,
  userLoginId,
  userNm,
  userEmail,
  token,
 },
});
export const register = () => ({
 type: REGISTER,
});

export const registerSuccess = ({ user, token, rememberMe }) => ({
 type: REGISTER_SUCCESS,
 payload: {
  user,
  token,
  rememberMe,
 },
});

export const registerFailure = (error) => ({
 type: REGISTER_FAILURE,
 payload: {
  error,
 },
});

export const login = () => ({
 type: LOGIN,
});

export const loginSuccess = ({ user, token, rememberMe }) => ({
 type: LOGIN_SUCCESS,
 payload: {
  user,
  token,
  rememberMe,
 },
});

export const loginFailure = (error) => ({
 type: LOGIN_FAILURE,
 payload: {
  error,
 },
});

export const initializeError = () => ({
 type: INITIALIZE_ERROR,
});

export const initializeInput = () => ({
 type: INITIALIZE_INPUT,
});

export const changeInput = ({ name, value }) => ({
 type: CHANGE_INPUT,
 payload: {
  name,
  value,
 },
});

const logoutEpic = (action$, state$) => {
 return action$.pipe(
  ofType(LOGOUT),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
   const token = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).token
    : null;
   return ajax
    .post(
     `/v1/logout/`,
     // post의 body를 비워놓는다.
     {},
     {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
     }
    )
    .pipe(
     map((response) => {
      // success시 localStorage에서 userInfo 삭제.
      localStorage.removeItem("userInfo");
      return logoutSuccess();
     }),
     catchError((error) => {
      of({
       type: LOGIN_FAILURE,
       payload: error,
       error: true,
      });
     })
    );
  })
 );
};

const checkUserEpic = (action$, state$) => {
 return action$.pipe(
  ofType(CHECK_USER),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
   const token = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).token
    : null;
   return ajax
    .get(`/v1/user/`, {
     "Content-Type": "application/json",
     Authorization: `X-AUTH-TOKEN ${token}`,
    })
    .pipe(
     map((response) => {
      return checkUserSuccess();
     }),
     catchError((error) =>
      of({
       type: CHECK_USER_FAILURE,
       payload: error,
       error: true,
      })
     )
    );
  })
 );
};
const registerEpic = (action$, state$) => {
 return action$.pipe(
  ofType(REGISTER),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
   const {
    userLoginId,
    userLoginPw,
    userNm,
    userEmail,
    rememberMe,
   } = state.auth.form;

   return ajax
    .post(`/v1/signup/`, {
     id: userLoginId,
     password: userLoginPw,
     name: userNm,
     email: userEmail,
    })
    .pipe(
     map((response) => {
      const { data } = response.response;
      const user = jwt(data); // decode your token here

      return registerSuccess({ user, data, rememberMe });
     }),
     catchError((error) =>
      of({
       type: REGISTER_FAILURE,
       payload: error,
       error: true,
      })
     )
    );
  })
 );
};

const loginEpic = (action$, state$) => {
 return action$.pipe(
  ofType(LOGIN),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
   const { userLoginId, userLoginPw, rememberMe } = state.auth.form;
   return ajax
    .post(`/v1/signin/`, { id: userLoginId, password: userLoginPw })
    .pipe(
     map((response) => {
      const { data } = response.response;
      const user = jwt(data); // decode your token here
      const token = data;

      console.log(user);
      return loginSuccess({ user, token, rememberMe });
     }),
     catchError((error) =>
      of({
       type: LOGIN_FAILURE,
       payload: error,
       error: true,
      })
     )
    );
  })
 );
};

const initialState = {
 form: {
  userLoginId: "",
  userLoginPw: "",
 },
 error: {
  triggered: false,
  message: "",
 },
 logged: false,
 userInfo: {
  carrierSeq: null,
  userSeq: null,
  userLoginId: "",
  userNm: "",
  userEmail: "",
  token: null,
 },
 rememberMe: true,
};

export const auth = (state = initialState, action) => {
 switch (action.type) {
  case INITIALIZE_INPUT:
   return {
    ...state,
    form: {
     userLoginId: "",
     userLoginPw: "",
     userNm: "",
     userEmail: "",
    },
   };
  case CHANGE_INPUT:
   let newForm = state.form;
   newForm[action.payload.name] = action.payload.value;
   return {
    ...state,
    form: newForm,
   };
  case INITIALIZE_ERROR:
   return {
    ...state,
    error: {
     triggered: false,
     message: "",
    },
   };
  case LOGIN_SUCCESS:
   return {
    ...state,
    logged: true,
    userInfo: {
     carrierSeq: action.payload.user.carrierSeq,
     userLoginId: action.payload.user.userLoginId,
     userNm: action.payload.user.userNm,
     userEmail: action.payload.user.userEmail,
     userSeq: action.payload.user.userSeq,
     token: action.payload.token,
    },
    rememberMe: action.payload.rememberMe,
   };
  case REGISTER_FAILURE:
   switch (action.payload.status) {
    case 400:
     return {
      ...state,
      error: {
       triggered: true,
       message: "WRONG USERNAME OR PASSWORD",
      },
     };
    case 500:
     return {
      ...state,
      error: {
       triggered: true,
       message: action.payload.response.msg,
      },
     };
    default:
     return {
      ...state,
     };
   }
  case REGISTER_SUCCESS:
   return {
    ...state,
    logged: true,
    userInfo: {
     userLoginId: action.payload.user.userLoginId,
     userNm: action.payload.user.userNm,
     userEmail: action.payload.user.userEmail,
     userSeq: action.payload.user.userSeq,
     token: action.payload.token,
    },
    rememberMe: action.payload.rememberMe,
   };
  case CHECK_USER_SUCCESS:
   return {
    ...state,
   };
  case CHECK_USER_FAILURE:
   return {
    ...state,
    logged: false,
    userInfo: {
     userLoginId: null,
     userNm: "",
     userSeq: null,
     userEmail: "",
     token: null,
    },
   };
  case SET_USER_TEMP:
   return {
    ...state,
    logged: true,
    userInfo: {
     carrierSeq: action.payload.carrierSeq,
     userLoginId: action.payload.userLoginId,
     userNm: action.payload.userNm,
     userEmail: action.payload.userEmail,
     userSeq: action.payload.userSeq,
     token: action.payload.token,
    },
   };
  case LOGOUT_SUCCESS:
   return {
    ...state,
    logged: false,
    userInfo: {
     carrierSeq: null,
     userSeq: null,
     userLoginId: "",
     userNm: "",
     userEmail: "",
     token: null,
     message: "",
    },
   };
  case LOGOUT_FAILURE:
   return {
    ...state,
    error: {
     triggered: true,
     message: "로그아웃이 실패했습니다. 다시 시도해주세요.",
    },
   };
  case LOGIN_FAILURE:
   switch (action.payload.status) {
    case 400:
     return {
      ...state,
      error: {
       triggered: true,
       message: "WRONG USERNAME OR PASSWORD",
      },
     };
    case 500:
     return {
      ...state,
      error: {
       triggered: true,
       message: action.payload.response.msg,
      },
     };
    default:
     return {
      ...state,
     };
   }

  default:
   return state;
 }
};

export const authEpics = { registerEpic, loginEpic, checkUserEpic, logoutEpic };
