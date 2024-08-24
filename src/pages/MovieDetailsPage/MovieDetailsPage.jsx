import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const prevLocationRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(prevLocationRef.current);
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go back
      </button>
      <div className={styles.details}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>User Score: {movie.vote_average * 10}%</p>
          <p>Overview: {movie.overview}</p>
          <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={`cast`} state={{ from: prevLocationRef.current }}>Cast</Link>
          </li>
          <li>
            <Link to={`reviews`} state={{ from: prevLocationRef.current }}>Reviews</Link>
          </li>
        </ul>
      </div>
      {/* Render nested routes here */}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;