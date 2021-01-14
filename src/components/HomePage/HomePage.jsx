import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './HomePage.module.css';

import apiService from '../../API-Service';

export default function HomePage() {
  const [trendingMovies, getTrendingMovies] = useState(null);
  useEffect(() => {
    if (trendingMovies !== null) {
      return;
    }
    apiService.getTrendingMovies().then(getTrendingMovies);
  }, [trendingMovies]);

  return (
    <div className={s.container}>
      <h1 className={s.header}>Trending today</h1>
      <ul className={s.list}>
        {trendingMovies &&
          trendingMovies.map(movie => (
            <li className={s.listItem} key={movie.id}>
              <Link className={s.link} to={`movies/${movie.id}`}>
                <img
                  className={s.moviePoster}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title || movie.name}
                ></img>
                <span>{movie.title || movie.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
