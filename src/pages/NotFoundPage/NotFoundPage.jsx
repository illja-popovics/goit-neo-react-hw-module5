import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={styles.container}>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <Link to="/" className={styles.link}>Go back to Home</Link>
  </div>
);

export default NotFoundPage;