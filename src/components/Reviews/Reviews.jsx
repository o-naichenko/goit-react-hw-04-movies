import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShowMore from 'react-show-more-button/dist/module';

import s from './Reviews.module.css';
import apiService from '../../API-Service';
export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    setStatus('pending');
    apiService.getMovieReviews(movieId).then(res => {
      res.length === 0 ? setStatus('error') : setReviews(res);
      setStatus('resolved');
    });
  }, [movieId]);

  return (
    <div>
      {status === 'error' && <p>We don`t have any reviews for this movie.</p>}
      {status === 'resolved' &&
        reviews.map(review => (
          <ShowMore
            classNameButton={s.showMoreBtn}
            classNameButtonDiv={s.showMoreBtnDiv}
            key={review.id}
            maxHeight={100}
          >
            <p>{review.content}</p>
          </ShowMore>
        ))}
    </div>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
