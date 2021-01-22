import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  Route,
} from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import apiService from '../../API-Service';
import MovieCard from '../MovieCard';
import MyLoader from '../MyLoader';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    if (movie) {
      return;
    }
    apiService.getMovieDetails(movieId).then(setMovie);
  }, [movie, movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
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
