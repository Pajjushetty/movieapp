import React, { useState } from 'react';

const CreateList = ({ addMovieList, currentUser }) => {
  const [listName, setListName] = useState('');
  const [isPublic, setIsPublic] = useState(false); // Changed to false by default

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      const createdBy = currentUser; // Assuming currentUser is the user ID of the creator
      addMovieList(listName, isPublic, createdBy); // Pass createdBy to addMovieList function
      setListName('');
      setIsPublic(false);
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Create a New Movie List</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='listName'>List Name</label>
          <input
            type='text'
            className='form-control'
            id='listName'
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </div>
        <div className='form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id='isPublic'
            checked={!isPublic} // Invert the logic to match private by default
            onChange={(e) => setIsPublic(!e.target.checked)} // Invert the checked state
          />
          <label className='form-check-label' htmlFor='isPublic'>
            Private (Only You Can See This List)
          </label>
        </div>
        <button type='submit' className='btn btn-primary mt-3'>
          Create List
        </button>
      </form>
    </div>
  );
};

export default CreateList;
