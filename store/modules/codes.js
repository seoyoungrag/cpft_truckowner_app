import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";

const GET_CODES = "codes/GET_CODE";
const GET_CODES_FAILURE = "codes/GET_CODES_FAILURE";
const GET_CODES_SUCCESS = "codes/GET_CODES_SUCCESS";

export const getCodes = () => ({
 type: GET_CODES,
});
export const getCodesSuccess = ({ codes }) => ({
 type: GET_CODES_SUCCESS,
 payload: {
  codes,
 },
});
export const getCodesFailure = (error) => ({
 type: GET_CODES_FAILURE,
 payload: {
  error,
 },
});
const getCodesEpic = (action$, state$) => {
 return action$.pipe(
  ofType(GET_CODES),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
   const token = localStorage.getItem("codes")
    ? JSON.parse(localStorage.getItem("userInfo")).token
    : null;
   return ajax
    .get(`/v1/code`, {
     "Content-Type": "application/json",
     Authorization: `token ${token}`,
    })
    .pipe(
     map((response) => {
      const codes = response.response.list;
      /*
      const test = (function () {
       return (function () {
        var rtn;
        var ctgry = codes.filter((codeCtgry) => {
         return codeCtgry.codeCtgryNm.includes("운송그룹");
        });
        if (ctgry && ctgry.length > 0) {
         rtn = ctgry[0].codes.filter((code) => {
          return code.codeUseYn.includes("Y");
         });
        } else {
         rtn = [];
        }
        return rtn;
       })();
      })();
*/
      return getCodesSuccess({ codes });
     }),
     catchError((error) =>
      of({
       type: GET_CODES_FAILURE,
       payload: error,
       error: true,
      })
     )
    );
  })
 );
};

const initialState = {
 codes: [],
 orderRegisWorkGroupCodes: [],
 rcritTypeCodes: [],
 carTypeCodes: [],
 tonTypeCodes: [],
 payFullTypeCodes: [],
 workDayCodes: [],
 // 에러 관련 state 등록.
 error: {
  triggered: false,
  message: "",
 },
};
export const codes = (state = initialState, action) => {
 switch (action.type) {
  case GET_CODES_SUCCESS:
   return {
    ...state,
    codes: action.payload.codes,
    orderRegisWorkGroupCodes: (function () {
     return (function () {
      var rtn;
      var ctgry = action.payload.codes.filter((codeCtgry) => {
       return codeCtgry.codeCtgryNm.includes("운송그룹");
      });
      if (ctgry && ctgry.length > 0) {
       rtn = ctgry[0].codes.filter((code) => {
        return code.codeUseYn.includes("Y");
       });
       if (rtn && rtn.length > 0) {
        rtn.sort(function (a, b) {
         // 오름차순
         return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
        });
       }
      } else {
       rtn = [];
      }
      return rtn;
     })();
    })(),
    rcritTypeCodes: (function () {
     return (function () {
      var rtn;
      var ctgry = action.payload.codes.filter((codeCtgry) => {
       return codeCtgry.codeCtgryNm.includes("모집유형");
      });
      if (ctgry && ctgry.length > 0) {
       rtn = ctgry[0].codes.filter((code) => {
        return code.codeUseYn.includes("Y");
       });
       if (rtn && rtn.length > 0) {
        rtn.sort(function (a, b) {
         // 오름차순
         return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
        });
       }
      } else {
       rtn = [];
      }
      return rtn;
     })();
    })(),
    carTypeCodes: (function () {
     return (function () {
      var rtn;
      var ctgry = action.payload.codes.filter((codeCtgry) => {
       return codeCtgry.codeCtgryNm.includes("차종");
      });
      if (ctgry && ctgry.length > 0) {
       rtn = ctgry[0].codes.filter((code) => {
        return code.codeUseYn.includes("Y");
       });
       if (rtn && rtn.length > 0) {
        rtn.sort(function (a, b) {
         // 오름차순
         return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
        });
       }
      } else {
       rtn = [];
      }
      return rtn;
     })();
    })(),
    tonTypeCodes: (function () {
     return (function () {
      var rtn;
      var ctgry = action.payload.codes.filter((codeCtgry) => {
       return codeCtgry.codeCtgryNm.includes("톤수");
      });
      if (ctgry && ctgry.length > 0) {
       rtn = ctgry[0].codes.filter((code) => {
        return code.codeUseYn.includes("Y");
       });
       if (rtn && rtn.length > 0) {
        rtn.sort(function (a, b) {
         // 오름차순
         return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
        });
       }
      } else {
       rtn = [];
      }
      return rtn;
     })();
    })(),
    payFullTypeCodes: (function () {
     return (function () {
      var rtn;
      var ctgry = action.payload.codes.filter((codeCtgry) => {
       return codeCtgry.codeCtgryNm.includes("완제/무제");
      });
      if (ctgry && ctgry.length > 0) {
       rtn = ctgry[0].codes.filter((code) => {
        return code.codeUseYn.includes("Y");
       });
       if (rtn && rtn.length > 0) {
        rtn.sort(function (a, b) {
         // 오름차순
         return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
        });
       }
      } else {
       rtn = [];
      }
      return rtn;
     })();
    })(),
    workDayCodes: (function () {
     return (function () {
      var rtn;
      var ctgry = action.payload.codes.filter((codeCtgry) => {
       return codeCtgry.codeCtgryNm.includes("요일");
      });
      if (ctgry && ctgry.length > 0) {
       rtn = ctgry[0].codes.filter((code) => {
        return code.codeUseYn.includes("Y");
       });
       if (rtn && rtn.length > 0) {
        rtn.sort(function (a, b) {
         // 오름차순
         return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
        });
       }
      } else {
       rtn = [];
      }
      return rtn;
     })();
    })(),
   };
  case GET_CODES_FAILURE:
   return {
    ...state,
    error: {
     triggered: true,
     message: "코드를 조회하는데 실패했습니다.",
    },
   };
  default:
   return state;
 }
};

export const codesEpics = {
 getCodesEpic,
};
