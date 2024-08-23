import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${process.env.VITE_API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      setReviews(response.data.results);
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id} className={styles.item}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, we don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;