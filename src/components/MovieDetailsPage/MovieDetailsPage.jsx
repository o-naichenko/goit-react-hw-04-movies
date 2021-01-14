import React, { useState, useEffect } from 'react';
import { NavLink, useRouteMatch, useParams } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import apiService from '../../API-Service';
import MovieCard from '../MovieCard';

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    if (movie) {
      return;
    }
    apiService.getMovieDetails(movieId).then(res => setMovie(res));
  }, [movie, movieId]);

  return (
    <div>
      <button className={s.goBackBtn}>&#8592; Go back</button>
      {movie && <MovieCard movie={movie} />}
      <nav>
        <NavLink to={`${url}/cast`}>Cast</NavLink>
        <NavLink to={`${url}/reviews`}>Reviews</NavLink>
      </nav>
    </div>
  );
}
