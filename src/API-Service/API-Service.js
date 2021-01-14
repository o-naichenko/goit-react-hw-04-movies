class ApiService {
  constructor() {
    this.API_KEY = 'ddf4c37c511f1a6f73099f52175f3c51';
    this.API_URL = 'https://api.themoviedb.org/3';
    this.query = '';
    this.queryPage = 1;
    this.movieId = null;
  }
  getTrendingMovies() {
    return fetch(`${this.API_URL}/trending/all/day?api_key=${this.API_KEY}`)
      .then(r => r.json())
      .then(({ results }) => results);
  }
  searchMovies() {
    return fetch(
      `${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${this.query}&${this.queryPage}`,
    )
      .then(r => r.json())
      .then(({ results }) => results);
  }
  getMovieDetails(movieId) {
    this.movieId = movieId;
    return fetch(
      `${this.API_URL}/movie/${this.movieId}?api_key=${this.API_KEY}`,
    ).then(r => r.json());
  }
  getMovieCredits() {
    return fetch(
      `${this.API_URL}/movie/${this.movieId}/credits?api_key=${this.API_KEY}>`,
    )
      .then(r => r.json())
      .then(({ results }) => results);
  }
  getMovieReviews() {
    return fetch(
      `${this.API_URL}/movie/${this.movieId}/reviews?api_key=${this.API_KEY}&${this.queryPage}`,
    )
      .then(r => r.json())
      .then(({ results }) => results);
  }
  setSearchQuery(queryString) {
    this.searchQuery = queryString.toLowerCase().split(' ').join('+');
  }
}

const apiService = new ApiService();
export default apiService;
