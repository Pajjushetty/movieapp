
import React from 'react';

const MovieLists = ({ movieLists, addMovieToList, movies }) => {
  return (
    <div className='container'>
      {movieLists.length > 0 ? (
        movieLists.map((list, index) => (
          <div key={index} className='mb-4'>
            <h3>{list.name} ({list.isPublic ? 'Public' : 'Private'})</h3>
            <div className='row'>
              {list.movies.length > 0 ? (
                list.movies.map((movie, movieIndex) => (
                  <div key={movieIndex} className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt='movie' />
                  </div>
                ))
              ) : (
                <p>No movies in this list.</p>
              )}
            </div>
            {list.isPublic && (
              <div className='row'>
                <h4>Add Movies</h4>
                {movies.map((movie, movieIndex) => (
                  <div key={movieIndex} className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt='movie' />
                    <div
                      onClick={() => addMovieToList(index, movie)}
                      className='overlay d-flex align-items-center justify-content-center'
                    >
                      <button className='btn btn-primary'>Add to List</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No movie lists available. Create a new list to get started.</p>
      )}
    </div>
  );
};

export default MovieLists;
