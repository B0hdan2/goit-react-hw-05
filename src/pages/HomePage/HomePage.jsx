import { useEffect, useState } from "react";
import { requestToServerPopularMovie } from "../../movies.API";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css"
import { useLocation } from "react-router-dom";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation()

  useEffect(() => {
    const popularMovies = async () => {
      try {
        const { results } = await requestToServerPopularMovie();

        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    };
    popularMovies();
  }, []);

  return (
    <main className={s.main}>
      <div className='container'>
        <h1>Trending today</h1>
        <MovieList movies={movies} location={location}/>
      </div>
    </main>
  );
}

export default HomePage;

// import MovieList from "../../components/MovieList/MovieList";
// import { requestToServerPopularMovie } from "../../movies.API";
// import { useLocation } from "react-router-dom";
// import { useHttp } from "../../hooks/use.Http";
// import s from "./HomePage.module.css";


// function HomePage() {
//   const location = useLocation();

//   const [movies] = useHttp(requestToServerPopularMovie);

//   return (
//     <main className={s.main}>
//       <div className='container'>
//         <h1>Trending today</h1>
//         <MovieList movies={movies} location={location} />
//       </div>
//     </main>
//   );
// }

// export default HomePage;
