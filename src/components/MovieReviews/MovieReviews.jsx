import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/use.Http.jsx";
import { requestToServerReviews } from "../../movies.API.js";
import s from "./MovieReviews.module.css";
import { BallTriangle } from "react-loader-spinner";

function MovieReviews() {
  const { movieId } = useParams();

  const [movies, loader, error] = useHttp(requestToServerReviews, movieId);

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
        <p>We don&apos;t have any reviews for this movie</p>
      ) : (
        <ul>
          {movies.map((review) => (
            <li className={s.item} key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieReviews;
