import React, { useState } from 'react';
import Modal from 'react-modal';

// Initialize react-modal
Modal.setAppElement('#root'); // Specify the root element of your app

function MovieApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Function to open the modal
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  // ...rest of your code

  return (
    <div>
      {/* Render movie cards */}
      {movies.map((movie) => (
        <div key={movie.id} className="movie" onClick={() => openModal(movie)}>
          {/* Display movie details */}
        </div>
      ))}

      {/* Movie Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Movie Details"
      >
        {selectedMovie && (
          <div>
            <h2>{selectedMovie.title}</h2>
            {/* Display additional movie details */}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

const [currentPage, setCurrentPage] = useState(1);
const moviesPerPage = 10; // Number of movies per page

// Function to load movies for the current page
const loadMoviesForPage = (page) => {
  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const moviesToDisplay = allMovies.slice(startIndex, endIndex);
  setDisplayedMovies(moviesToDisplay);
};

// Function to handle page change
const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
  loadMoviesForPage(newPage);
};
  

{/* Pagination */}
{allMovies.length > moviesPerPage && (
  <Pagination
    currentPage={currentPage}
    totalPages={Math.ceil(allMovies.length / moviesPerPage)}
    onPageChange={handlePageChange}
  />
)}


export default MovieApp;
