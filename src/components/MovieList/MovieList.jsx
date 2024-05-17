import { NavLink } from "react-router-dom";
import s from "./MovieList.module.css";

function MovieList({ movies, location }) {
  const photo = "https://image.tmdb.org/t/p/w500/";
  return (
    <>
      <ul className={s.list}>
        {movies.map((movie) => (
          <li className={s.item} key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} state={location}>
              <img
                src={
                  movie.poster_path === null
                    ? "https://i.work.ua/article/2489b.jpg?v=1604507320"
                    : photo + movie.poster_path
                }
                alt={movie.title}
                width={200}
                height={250}
              />
              <h2 className={s.title}>{movie.title}</h2>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MovieList;
