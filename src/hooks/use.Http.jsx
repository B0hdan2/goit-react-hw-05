import { useEffect, useState } from "react";

export const useHttp = (featchFn, param) => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setMovies([]);
        setError(false);
        setLoader(true);
        const { results, cast } = await featchFn(param);

        setMovies(results || cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getMovies();
  }, [featchFn, param]);

  return [movies, loader, error, setMovies];
};
