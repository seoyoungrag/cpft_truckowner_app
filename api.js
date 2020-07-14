import axios from "axios";

const TMDB_KEY = "743fefbcfe0700b7660693ec2c54ab7f";

const makeRequest = (path, params) =>
 axios.get(`https://api.themoviedb.org/3${path}`, {
  params: { ...params, api_key: TMDB_KEY },
 });

export const movieApi = {
 nowPlaying: () => makeRequest("/movie/now_playing"),
 popular: () => makeRequest("/movie/popular"),
 upcoming: () => makeRequest("/movie/upcoming", { region: "kr" }),
 search: (word) => makeRequest("/search/movie", { query }),
 movie: (id) => makeRequest(`/movie/${id}`),
 discover: () => makeRequest("/discover/movie"),
};

export const tvApi = {
 today: () => makeRequest("/tv/airing_today"),
 thisWeek: () => makeRequest("/tv/on_the_air"),
 topRated: () => makeRequest("/tv/top_rated"),
 popular: () => makeRequest("/tv/popular"),
 search: (word) => makeRequest("/serach/tv", { query }),
 show: (id) => makeRequest(`/tv/${id}`),
};
