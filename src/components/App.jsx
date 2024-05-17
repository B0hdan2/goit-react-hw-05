import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { BallTriangle } from "react-loader-spinner";

const Navigation = lazy(() => import("./Navigation/Navigation"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App = () => {
  return (
    <>
      <Navigation />

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
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
            <Route path='/movies/:movieId/cast' element={<MovieCast />} />
            <Route path='/movies/:movieId/reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default App;
