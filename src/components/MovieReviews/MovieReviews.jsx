import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestToServerReviews } from "../../movies.API.js";
import s from "./MovieReviews.module.css";

function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    try {
      const getReviews = async () => {
        const { results } = await requestToServerReviews(movieId);
        setReviews(results);
      };
      getReviews();
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  return (
    <>
      {reviews.length === 0 ? (
        <p>We don&apos;t have any reviews for this movie</p>
      ) : (
        <ul>
          {reviews.map((review) => (
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
