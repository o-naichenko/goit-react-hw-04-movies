import React, { lazy, Suspense } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import s from './App.module.css';

import MyLoader from './components/MyLoader';

const HomePage = lazy(() =>
  import('./components/HomePage' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const MoviesPage = lazy(() =>
  import('./components/MoviesPage' /* webpackChunkName: "movies-page" */),
);

function App() {
  return (
    <>
      <nav className={s.nav}>
        <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
          Movies
        </NavLink>
      </nav>
      <div className={s.container}>
        <Suspense fallback={<MyLoader />}>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/movies" exact>
              <MoviesPage />
            </Route>
            <Route path="/movies/:movieId">
              <MovieDetailsPage />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </>
  );
}

export default App;
