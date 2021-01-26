import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';

import s from './Reviews.module.css';
import apiService from '../../API-Service';
export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    setStatus('pending');
    apiService.getMovieReviews(movieId).then(res => {
      if (res.length === 0) {
        setStatus('error');
        return;
      }
      setReviews(res);
      setStatus('resolved');
    });
  }, [movieId]);

  return (
    <div>
      {status === 'error' && <p>We don`t have any reviews for this movie.</p>}
      {status === 'resolved' && (
        <ul>
          {reviews.map(review => (
            <li className={s.item} key={review.id}>
              <ShowMoreText
                lines={3}
                more="show more"
                less="show less"
                className={s.text}
                anchorClass={s.showMoreBtn}
                expanded={false}
                width={280}
              >
                <p>
                  author: <span className={s.author}>{review.author}</span>
                </p>
                <br />
                <p>{review.content}</p>
              </ShowMoreText>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
