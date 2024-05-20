import { useLocation, useSearchParams } from "react-router-dom";
import { requestToServerMovies } from "../../movies.API";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { useHttp } from "../../hooks/use.Http";
import { BallTriangle } from "react-loader-spinner";

function MoviesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const film = searchParams.get("query") ?? "";

  const [movies, loader, error] = useHttp(requestToServerMovies, film);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams(
      form.elements.movie.value === ""
        ? {}
        : { query: form.elements.movie.value }
    );

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
        {loader && (
          <BallTriangle
            height={50}
            width={50}
            radius={5}
            color='#000'
            ariaLabel='ball-triangle-loading'
            wrapperStyle={{
              display: "flex",
              justifyContent: "space-around",
              paddingTop: 20,
              paddingBottom: 20,
            }}
            wrapperClass=''
            visible={true}
          />
        )}
        {error && <div>Error</div>}
        <MovieList movies={movies} location={location} />
      </div>
    </main>
  );
}

export default MoviesPage;
