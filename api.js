import axios from "axios";
axios.interceptors.request.use((request) => {
 //console.log("Starting Request", request);
 return request;
});

axios.interceptors.response.use((response) => {
 //console.log("Response:", response);
 return response;
});

const TMDB_KEY = "743fefbcfe0700b7660693ec2c54ab7f";
const jwtToken =
 "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwidXNlckxvZ2luSWQiOiJ5b3VuZ3JhZy5zZW8iLCJ1c2VyTm0iOiLshJzsmIHrnb0iLCJ1c2VyU2VxIjoiMSIsInVzZXJFbWFpbCI6InlvdW5ncmFnLnNlb0B0aW1mLmNvLmtyIiwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9DQVJSSUVSIl0sImNhcnJpZXJTZXEiOiIxIiwiY2Fycmllck5tIjoi7YyA7ZSE66CI7IucIiwiaWF0IjoxNTk2NDE5MjE0LCJleHAiOjE1OTkwMTEyMTR9.o1o9HDtEvJSPPyqchsPlnlKeAV8RqmpLFPNfdE5uYH4";
const makeRequest = (path, params) =>
 axios.get(`https://api.themoviedb.org/3${path}`, {
  params: { ...params, api_key: TMDB_KEY },
 });
const makeRequestCpft = (path, config) =>
 axios.get(`https://blueapi.teamfresh.co.kr${path}`, config);

const getAnythingCpft = async (path, params = {}) => {
 try {
  const {
   data: { list },
   data: { data },
   result,
  } = await makeRequestCpft(path, {
   headers: {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": jwtToken,
   },
   params: { ...params },
  });
  return [list || data || result, null];
 } catch (e) {
  return [null, e];
 }
};

const postAnythingCpft = async (path, params = {}) => {
 try {
  const {
   data: { list },
   data: { data },
   result,
  } = await makePostRequestCpft(path, {
   headers: {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": jwtToken,
   },
   params: { ...params },
  });
  return [list || data || result, null];
 } catch (e) {
  return [null, e];
 }
};

const makePostRequestCpft = (path, config) =>
 axios.post(`https://blueapi.teamfresh.co.kr${path}`, config);

const getAnything = async (path, params = {}) => {
 try {
  const {
   data: { results },
   data,
  } = await makeRequest(path, params);
  return [results || data, null];
 } catch (e) {
  return [null, e];
 }
};
export const movieApi = {
 nowPlaying: () => getAnything("/movie/now_playing"),
 popular: () => getAnything("/movie/popular"),
 upcoming: () => getAnything("/movie/upcoming", { region: "kr" }),
 search: (query) => getAnything("/search/movie", { query }),
 movie: (id) => getAnything(`/movie/${id}`, { append_to_response: "videos" }),
 discover: () => getAnything("/discover/movie"),
};

export const tvApi = {
 today: () => getAnything("/tv/airing_today"),
 thisWeek: () => getAnything("/tv/on_the_air"),
 topRated: () => getAnything("/tv/top_rated"),
 popular: () => getAnything("/tv/popular"),
 search: (query) => getAnything("/search/tv", { query }),
 show: (id) => getAnything(`/tv/${id}`, { append_to_response: "videos" }),
};

export const apiImage = (
 path,
 defaultPoster = "https://images.unsplash.com/photo-1594782078968-2b07656d7bb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
) => (path ? `https://image.tmdb.org/t/p/w500${path}` : defaultPoster);

export const orderApi = {
 now: (status) => getAnythingCpft(`/v1/mobile/order/status/${status}`),
 order: (orderSeq) => getAnythingCpft(`/v1/mobile/order/${orderSeq}`),
 truckOwnerOrders: (status, userSeq) =>
  getAnythingCpft(`/v1/mobile/order/status/${status}/truckOwner/${userSeq}`),
};

export const barobillApi = {
 getTaxInvoicePopUpURLUsingPOST: (mgtKey) =>
  postAnythingCpft(`/v1/barobill/getTaxInvoicePopUpURL?mgtKey=${mgtKey}`),
};
export const codeApi = {
 codes: () => getAnythingCpft(`/v1/mobile/code`),
};
