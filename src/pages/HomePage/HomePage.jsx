import { useEffect, useState } from "react";
import { requestToServerPopularMovie } from "../../movies.API";
import MovieList from "../../components/MovieList/MovieList";


function HomePage() {
  const [movies, setMovies] = useState([]);
  

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
    <main>
      <h1>Trending today</h1>
      <MovieList movies={movies}/>
    </main>
  );
}

export default HomePage;
