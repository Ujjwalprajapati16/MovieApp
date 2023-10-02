"use client"
import React, { useState, useEffect } from 'react';
// import YourLogo from './YourLOGO';
// import MovieList from '@/Components/MovieList';
// import MovieDetailModal from '@/Components/MovieDetailModal';

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c0af190b937ba74d7e34233115d31313&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=c0af190b937ba74d7e34233115d31313&page=1&query=';

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      getMovies(API_URL + `&page=${currentPage}`);
    }
  }, [currentPage]);

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  const showMovies = (movies) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <img src={`${IMG_PATH + movie.poster_path}`} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <span className={getClassByRate(movie.vote_average)}>{movie.vote_average}</span>
            </div>
            <div className="overview">
              <h3>Overview</h3>
              {movie.overview}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getClassByRate = (vote) => {
    if (vote >= 8) {
      return 'text-green-500';
    } else if (vote >= 5) {
      return 'text-orange-500';
    } else {
      return 'text-red-500';
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && searchTerm !== '') {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('');
    } else {
      window.location.reload();
    }
  };

  const handleHomeClick = () => {
    window.location.reload();
  };

  return (
    <div>
      {/* <header className="bg-blue-500 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Movie App</h1>
          {/* <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              className="bg-white rounded-full w-64 px-4 py-2"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form> */}
          {/* <div className="relative w-64">
            <input
              type="text"
              className="bg-white rounded-full w-full px-4 py-2 pl-10 focus:outline-none focus:shadow-outline"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                
              </svg>
            </span>
          </div>

        </div>
      </header> */}

      <header className="bg-primary-color py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Movie App</h1>
          <img src="/logo.png" alt="App Logo" className="h-10 w-auto" />
          <form onSubmit={handleFormSubmit}>
          <div className="relative w-64">
            <input
              type="text"
              className="bg-white rounded-full w-full px-4 py-2 pl-10 focus:outline-none focus:shadow-outline"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
              {/* <img src={} alt="App Logo" className="h-10 w-auto text-blue-500" /> */}

              </svg>
            </span>
          </div>

          </form>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        {showMovies(movies)}
        {movies.length > 0 && (
          <button
            id="load-more"
            className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 block mx-auto"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </main>
      <footer className="bg-blue-500 py-4 text-center">
        <button className="text-white" onClick={handleHomeClick}>
          Home
        </button>
      </footer>
    </div>
  );
}




export default MovieApp;
