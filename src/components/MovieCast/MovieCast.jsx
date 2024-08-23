import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching the cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {cast.map(actor => (
        <li key={actor.cast_id} className={styles.item}>
          <img
            src={actor.profile_path 
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : '/path/to/fallback-image.jpg'}
            alt={actor.name}
          />
          <p>{actor.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;