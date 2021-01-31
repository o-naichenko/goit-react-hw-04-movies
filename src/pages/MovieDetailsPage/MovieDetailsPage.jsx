import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  Route,
  NavLink,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import apiService from '../../API-Service';
import MovieCard from '../../components/MovieCard';
import MyLoader from '../../components/MyLoader';
const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const goBackLocation = useRef(null);

  useEffect(() => {
    if (movie || goBackLocation.current) {
      return;
    }
    apiService.getMovieDetails(movieId).then(setMovie);
    goBackLocation.current = location?.state?.from ?? '/';
  }, [location?.state?.from, movie, movieId]);

  const onGoBack = () => {
    history.push(goBackLocation.current);
  };

  return (
    <div>
      <button type="button" className={s.btn} onClick={onGoBack}>
        &#8592; Go back
      </button>
      {movie && <MovieCard movie={movie} />}
      <h4>Additional information</h4>
      <nav className={s.nav}>
        <ul className={s.navList}>
          <li className={s.navItem}>
            <NavLink className={s.btn} to={`${url}/cast`}>
              Cast
            </NavLink>
          </li>
          <li className={s.navItem}>
            <NavLink className={s.btn} to={`${url}/reviews`}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<MyLoader />}>
        <Route path={`${url}/cast`}>
          <Cast movieId={movieId} />
        </Route>
        <Route path={`${url}/reviews`}>
          <Reviews movieId={movieId} />
        </Route>
      </Suspense>
    </div>
  );
}
