import { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate, Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      setMovie(response.data);
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>Go back</button>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>User Score: {movie.vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <ul>
          <li><Link to="cast">Cast</Link></li>
          <li><Link to="reviews">Reviews</Link></li>
        </ul>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;