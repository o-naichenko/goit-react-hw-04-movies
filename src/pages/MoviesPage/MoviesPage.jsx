import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';

import s from './MoviesPage.module.css';

import apiService from '../../API-Service';
import MyLoader from '../../components/MyLoader/';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query !== null) {
      return;
    }
    if (location.search) {
      const getQuery = new URLSearchParams(location.search);
      const onGoBackQuery = getQuery.get('query');
      fetchMovies(onGoBackQuery);
      setQuery(onGoBackQuery);
    }
  }, [location.search, query]);

  function fetchMovies(query) {
    setStatus('pending');
    apiService.searchMovies(query).then(res => {
      if (res.length === 0) {
        setStatus('error');
        return;
      }
      setMovies(res);
      setStatus('resolved');
    });
  }

  const onChange = e => {
    setQuery(e.target.value);
    // history.push({ ...location, search: `query=${query}` });
  };

  const onSubmit = e => {
    e.preventDefault();
    fetchMovies(query);
    history.push({ ...location, search: `query=${query}` });
  };
  return (
    <div className={s.container}>
      <form className={s.form} action="submit" onSubmit={onSubmit}>
        <input
          className={s.input}
          type="text"
          value={query ?? ''}
          onChange={onChange}
        />
        <button
          disabled={!query && true}
          className={classNames(s.btn, query && s.disabled)}
          type="submit"
        >
          Search
        </button>
      </form>
      {status === 'pending' && <MyLoader />}
      {status === 'error' && <p>No movies found</p>}
      <ul className={s.list}>
        {status === 'resolved' &&
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
