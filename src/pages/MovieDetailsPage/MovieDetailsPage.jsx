import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { requestToServerDetalic } from "../../movies.API";
import { IoArrowBack } from "react-icons/io5";
import s from "./MovieDetailsPage.module.css";
import { BallTriangle } from "react-loader-spinner";

function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();
  const photo = "https://image.tmdb.org/t/p/w500/";
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

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
      <section className={s.section}>
        <div className={s.containerDetails}>
          <NavLink className={s.button} to={goBackRef.current}>
            {<IoArrowBack className={s.icon} />}
          </NavLink>
          <img
            className={s.img}
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
            <li className={s.item}>
              <h2>
                {movie.original_title} ({movie.release_date})
              </h2>
              <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
            </li>
            <li className={s.item}>
              <b>Overview</b>
              <p>{movie.overview}</p>
            </li>
            <li className={s.item}>
              <b>Genres</b>
              <p>
                {movie.genres
                  ? movie.genres.map((genre) => genre.name).join(", ")
                  : "No genres available"}
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className={s.section}>
        <div className='container'>
          <div className={s.container}>
            <h3 className={s.title}>Additional information</h3>
            <ul className={s.infoList}>
              <li className={s.infoItem}>
                <NavLink className={s.infoLink} to={`/movies/${movieId}/cast`}>
                  Cast
                </NavLink>
              </li>
              <li className={s.infoItem}>
                <NavLink
                  className={s.infoLink}
                  to={`/movies/${movieId}/reviews`}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>

          <Suspense
            fallback={
              <BallTriangle
              height={50}
              width={50}
              radius={5}
              color='#000'
              ariaLabel='ball-triangle-loading'
              wrapperStyle={{
                display: "flex",
                justifyContent: 'space-around',
                paddingTop: 20,
                paddingBottom: 20,
              }}
              wrapperClass=''
              visible={true}
            />
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

export default MovieDetailsPage;

// import { Suspense, useRef } from "react";
// import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
// import { requestToServerDetalic } from "../../movies.API";
// import { IoArrowBack } from "react-icons/io5";
// import s from "./MovieDetailsPage.module.css";
// import { BallTriangle } from "react-loader-spinner";
// import { useHttp } from "../../hooks/use.Http";

// function MovieDetailsPage() {
//   const { movieId } = useParams();
//   const photo = "https://image.tmdb.org/t/p/w500/";
//   const location = useLocation();
//   const goBackRef = useRef(location.state ?? "/movies");

//   const [movies] = useHttp(requestToServerDetalic, movieId);

//   console.log(movies);
//   return (
//     <main>
//       <section className={s.section}>
//         <div className={s.containerDetails}>
//           <NavLink className={s.button} to={goBackRef.current}>
//             {<IoArrowBack className={s.icon} />}
//           </NavLink>
//           <img
//             className={s.img}
//             src={
//               movies.poster_path === null
//                 ? "https://i.work.ua/article/2489b.jpg?v=1604507320"
//                 : photo + movies.poster_path
//             }
//             alt={movies.title}
//             width={movies.poster_path === null ? 700 : 300}
//             height={450}
//           />
//           <ul>
//             <li className={s.item}>
//               <h2>
//                 {movies.original_title} ({movies.release_date})
//               </h2>
//               <p>User Score: {Math.round(movies.vote_average * 10)}%</p>
//             </li>
//             <li className={s.item}>
//               <b>Overview</b>
//               <p>{movies.overview}</p>
//             </li>
//             <li className={s.item}>
//               <b>Genres</b>
//               <p>
//                 {movies.genres
//                   ? movies.genres.map((genre) => genre.name).join(", ")
//                   : "No genres available"}
//               </p>
//             </li>
//           </ul>
//         </div>
//       </section>
//       <section className={s.section}>
//         <div className='container'>
//           <div className={s.container}>
//             <h3 className={s.title}>Additional information</h3>
//             <ul className={s.infoList}>
//               <li className={s.infoItem}>
//                 <NavLink className={s.infoLink} to={`/movies/${movieId}/cast`}>
//                   Cast
//                 </NavLink>
//               </li>
//               <li className={s.infoItem}>
//                 <NavLink
//                   className={s.infoLink}
//                   to={`/movies/${movieId}/reviews`}
//                 >
//                   Reviews
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           <Suspense
//             fallback={
//               <BallTriangle
//                 height={50}
//                 width={50}
//                 radius={5}
//                 color='#000'
//                 ariaLabel='ball-triangle-loading'
//                 wrapperStyle={{
//                   display: "flex",
//                   justifyContent: "space-around",
//                   paddingTop: 20,
//                   paddingBottom: 20,
//                 }}
//                 wrapperClass=''
//                 visible={true}
//               />
//             }
//           >
//             <Outlet />
//           </Suspense>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default MovieDetailsPage;
