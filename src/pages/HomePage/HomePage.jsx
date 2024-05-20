import MovieList from "../../components/MovieList/MovieList";
import { requestToServerPopularMovie } from "../../movies.API";
import { useLocation } from "react-router-dom";
import { useHttp } from "../../hooks/use.Http";
import s from "./HomePage.module.css";
import { BallTriangle } from "react-loader-spinner";

function HomePage() {
  const location = useLocation();

  const [movies, loader, error] = useHttp(requestToServerPopularMovie);

  return (
    <main className={s.main}>
      <div className='container'>
        <h1>Trending today</h1>
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
        <MovieList movies={movies} location={location} />
      </div>
    </main>
  );
}

export default HomePage;
