import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

axios.defaults.headers.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWM2NmI2OGRmYTgwMjU4NGQ4ODU1YzA2NTQzYzk2YSIsInN1YiI6IjY2NDRiMjFiOGU2NDk3ZWY2ZTViY2E3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tAGWbaXeAhkcY0nU4HIL0o4BcqDwuqZF0SZXYO6WBDI";

export const requestToServerPopularMovie = async () => {
  const { data } = await axios.get("trending/movie/day");

  return data;
};
export const requestToServerMovies = async (query) => {
  const { data } = await axios.get("search/movie", {
    params: {
      query,
    },
  });

  return data;
};

export const requestToServerDetalic = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`);

  return data;
};
export const requestToServerActors = async (actorId) => {
  const { data } = await axios.get(`movie/${actorId}/credits`);

  return data;
};
export const requestToServerReviews = async (reviewsId) => {
  const { data } = await axios.get(`movie/${reviewsId}/reviews`);

  return data;
};
