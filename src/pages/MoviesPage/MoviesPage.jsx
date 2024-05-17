import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { requestToServerMovies } from "../../movies.API";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const film = searchParams.get("query") ?? "";

  useEffect(() => {
    if (film === "") return;

    try {
      const getMovies = async () => {
        const { results } = await requestToServerMovies(film);

        setMovies(results);
      };
      getMovies();
    } catch (error) {
      console.log(error);
    }
  }, [film]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams(
      form.elements.movie.value === ""
        ? {}
        : { query: form.elements.movie.value }
    );
    setMovies([]);
    form.reset();
  };

  return (
    <main>
      <div className='container'>
        <div className={s.box}>
          <form onSubmit={handleSubmit}>
            <input className={s.input} type='text' name='movie'></input>
            <button className={s.button} type='submit'>
              search
            </button>
          </form>
        </div>
        <MovieList movies={movies} location={location} />
      </div>
    </main>
  );
}

export default MoviesPage;
