import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      setTrendingMovies(response.data.results);
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>
      <MovieList movies={trendingMovies} />
    </div>
  );
};

export default HomePage;