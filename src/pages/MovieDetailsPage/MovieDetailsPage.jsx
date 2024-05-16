import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { requestToServerDetalic } from "../../movies.API";

function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();
  const photo = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    const detailsiMovies = async () => {
      try {
        const results = await requestToServerDetalic(movieId);

        setMovie(results);
      } catch (error) {
        console.log(error);
      }
    };
    detailsiMovies();
  }, [movieId]);

  return (
    <main>
      <section>
        <img
          src={
            movie.poster_path === null
              ? "https://i.work.ua/article/2489b.jpg?v=1604507320"
              : photo + movie.poster_path
          }
          alt={movie.title}
          width={movie.poster_path === null ? 700 : 300}
          height={450}
        />
        <ul>
          <li>
            <h2>
              {movie.original_title} ({movie.release_date})
            </h2>
            <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          </li>
          <li>
            <b>Overview</b>
            <p>{movie.overview}</p>
          </li>
          <li>
            <b>Genres</b>
            <p>
              {movie.genres
                ? movie.genres.map((genre) => genre.name).join(", ")
                : "No genres available"}
            </p>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <p>Additional information</p>
          <li>
            <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
          </li>
        </ul>
        <Outlet />
      </section>
    </main>
  );
}

export default MovieDetailsPage;
