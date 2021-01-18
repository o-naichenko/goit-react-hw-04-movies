import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import s from './MoviesPage.module.css';

import apiService from '../../API-Service';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const comeBackQuery = location.search;

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (comeBackQuery) {
      apiService.searchMovies(comeBackQuery).then(res => setMovies(res));
      history.push({ ...location, search: comeBackQuery });
    }
  }, []);

  const onChange = e => {
    setQuery(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    apiService.searchMovies(query).then(res => setMovies(res));
    history.push({ ...location, search: query });
  };
  return (
    <div className={s.container}>
      <form className={s.form} action="submit" onSubmit={onSubmit}>
        <input
          className={s.input}
          type="text"
          value={query}
          onChange={onChange}
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
      <ul className={s.list}>
        {movies &&
          movies.map(movie => (
            <li className={s.item} key={movie.id}>
              <Link
                className={s.link}
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                {movie.title ?? movie.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
