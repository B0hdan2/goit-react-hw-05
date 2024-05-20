import { requestToServerActors } from "../../movies.API";
import { useParams } from "react-router-dom";
import { MdOutlineImageNotSupported } from "react-icons/md";
import s from "./MovieCast.module.css";
import { useHttp } from "../../hooks/use.Http";
import { BallTriangle } from "react-loader-spinner";

function MovieCast() {
  const { movieId } = useParams();
  const photo = "https://image.tmdb.org/t/p/w500/";

  const [movies, loader, error] = useHttp(requestToServerActors, movieId);

  return (
    <>
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
      {!loader && !error && movies.length === 0 ? (
        <p>No cast information available</p>
      ) : (
        <ul className={s.list}>
          {movies.map((actor) => (
            <li className={s.item} key={actor.id}>
              {actor.profile_path === null ? (
                <MdOutlineImageNotSupported className={s.icon} />
              ) : (
                <img
                  src={photo + actor.profile_path}
                  alt={actor.original_name}
                  width='80'
                  height='120'
                />
              )}

              <h3 className={s.title}>{actor.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieCast;
