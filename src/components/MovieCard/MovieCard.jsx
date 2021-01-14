import React from 'react';
import PropTypes from 'prop-types';

import s from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  console.log(movie);
  const getReleaseDate = () => {
    return movie.release_date ? movie.release_date.slice(0, 4) : null;
  };
  const getUserScore = () => {
    if (movie.vote_average) {
      return `User score: ${movie.vote_average * 10} %`;
    }
  };

  return (
    <div className={s.movieCard}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title || movie.name}
      />
      <div className={s.textContainer}>
        <h1>
          {movie.title || movie.name} {`(${getReleaseDate()})`}
        </h1>
        <p>{getUserScore()}</p>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        {movie.genres && (
          <>
            <h3>Genres</h3>
            <ul className={s.genreList}>
              {movie.genres.map(genre => (
                <li key={genre.id} className={s.genreListItem}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};
