import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const handleSearch = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (searchQuery === '') {
      return;
    }

    setSearchParams({ query: searchQuery });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          className={styles.input}
          placeholder="Search for a movie"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;