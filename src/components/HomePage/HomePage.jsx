import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './HomePage.module.css';

import Loader from 'react-loader-spinner';
import apiService from '../../API-Service';

export default function HomePage() {
  const location = useLocation();
  const [trendingMovies, setTrendingMovies] = useState(null);
  useEffect(() => {
    if (trendingMovies !== null) {
      return;
    }
    apiService.getTrendingMovies().then(setTrendingMovies);
  }, [trendingMovies]);

  return (
    <div className={s.container}>
      <h1 className={s.header}>Trending today</h1>
      <ul className={s.list}>
        {trendingMovies ? (
          trendingMovies.map(movie => (
            <li className={s.listItem} key={movie.id}>
              <Link
                className={s.link}
                to={{
                  pathname: `movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                <img
                  className={s.moviePoster}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title ?? movie.name}
                ></img>
                <p>{movie.title ?? movie.name}</p>
              </Link>
            </li>
          ))
        ) : (
          <Loader
            type="ThreeDots"
            color="var(--blue)"
            height={40}
            width={40}
            style={{ margin: '0 auto' }}
          />
        )}
      </ul>
    </div>
  );
}
