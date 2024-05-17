import { useEffect, useState } from "react";

export const useHttp = (featchFn, param) =>{
    const [movies, setMovies] = useState(null);

  console.log(featchFn(param));

    useEffect(() => {
      const getMovies = async () => {
        try {
          const results  = await featchFn(param);

          setMovies(results);
        } catch (error) {
          console.log(error);
        }
      };
      getMovies();
    }, [featchFn, param]);
console.log(movies);
    return [movies, setMovies]
}
