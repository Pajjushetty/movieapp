import React from 'react';

const RemoveList = ({ movieLists, removeList }) => {
    return (
        <div className='container'>
            <h2>Remove Movie List</h2>
            {movieLists.length > 0 ? (
                <ul>
                    {movieLists.map((list, index) => (
                        <li key={index}>
                            <span>{list.name}</span>
                            <button onClick={() => removeList(index)} className='btn btn-danger ml-2' style={{ marginLeft: '10px' }}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movie lists available.</p>
            )}
        </div>
    );
};

export default RemoveList;
