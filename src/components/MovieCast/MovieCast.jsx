import { useEffect, useState } from "react";
import { requestToServerActors } from "../../movies.API";
import { useParams } from "react-router-dom";
import { MdOutlineImageNotSupported } from "react-icons/md";
import s from "./MovieCast.module.css";

function MovieCast() {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  const photo = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    const getActors = async () => {
      try {
        const { cast } = await requestToServerActors(movieId);

        setActors(cast);
      } catch (error) {
        console.log(error);
      }
    };
    getActors();
  }, [movieId]);

  return (
    <>
      {actors.length === 0 ? (
        <p>No cast information available</p>
      ) : (
        <ul className={s.list}>
          {actors.map((actor) => (
            <li className={s.item} key={actor.id}>
              {actor.profile_path === null ? (
                <MdOutlineImageNotSupported className={s.icon}/>
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
