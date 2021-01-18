import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import s from './App.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import MovieDetailsPage from './components/MovieDetailsPage';
import MoviesPage from './components/MoviesPage';
import HomePage from './components/HomePage';

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
      </div>
    </>
  );
}

export default App;
