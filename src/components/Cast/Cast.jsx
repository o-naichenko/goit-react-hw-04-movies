import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './Cast.module.css';

import apiService from '../../API-Service';
import defaultActorImage from '../../images/default-actor-picture.png';
export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);
  useEffect(() => {
    if (cast !== null) {
      return;
    }

    apiService.getMovieCredits(movieId).then(setCast);
  }, [cast, movieId]);

  return (
    <div className={s.container}>
      {cast && (
        <ul className={s.list}>
          {cast.map(actor => (
            <li key={actor.credit_id} className={s.item}>
              <img
                className={s.img}
                src={
                  apiService.getImgPath(actor.profile_path) || defaultActorImage
                }
                alt={actor.name}
              />
              <p className={s.actorName}>{actor.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
