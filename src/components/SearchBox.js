import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='col col-sm-4 offset-sm-8'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type the name of the movie '
			></input>
		</div>
	);
};

export default SearchBox;
