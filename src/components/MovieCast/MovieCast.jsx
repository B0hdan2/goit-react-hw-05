import { useEffect, useState } from "react";
import { requestToServerActors } from "../../movies.API";
import { useParams } from "react-router-dom";

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
        <ul>
          {actors.map((actor) => (
            <li key={actor.id}>
              <img
                src={ actor.profile_path === null ?"../../../public/free-icon-no-photo-4054617.png":photo + actor.profile_path}
                alt={actor.original_name}
                width='150'
                height='200'
              />
              <h3>{actor.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieCast;
