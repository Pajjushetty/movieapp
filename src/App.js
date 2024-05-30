import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import MovieList from './components/MovieList';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/searchmovie';
import MovieLists from './components/publicorprivate';
import CreateList from './components/createList';
import RemoveList from './components/RemoveList';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [isRegistered, setIsRegistered] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [movieLists, setMovieLists] = useState([]);
	const [currentUser] = useState(null);

	console.log('OMDB API Key:', API_KEY); // Log to check if API key is being read

	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;
		try {
			const response = await fetch(url);
			const responseJson = await response.json();
			if (responseJson.Search) {
				setMovies(responseJson.Search);
			}
		} catch (error) {
			console.error('Failed to fetch movies:', error);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
		if (movieFavourites) {
			setFavourites(movieFavourites);
		}

		const storedMovieLists = JSON.parse(localStorage.getItem('react-movie-app-movieLists'));
		if (storedMovieLists) {
			setMovieLists(storedMovieLists);
		}
	}, []);

	const saveToLocalStorage = (key, items) => {
		localStorage.setItem(key, JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage('react-movie-app-favourites', newFavouriteList);
	};

	const handleRegister = () => {
		setIsRegistered(true);
	};

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const addMovieList = (listName, isPublic) => {
		const newMovieLists = [...movieLists, { name: listName, movies: [], isPublic }];
		setMovieLists(newMovieLists);
		saveToLocalStorage('react-movie-app-movieLists', newMovieLists);
	};

	const addMovieToList = (listIndex, movie) => {
		const targetList = movieLists[listIndex];
		if (targetList.isPublic || (isLoggedIn && targetList.createdBy === currentUser)) {
			const newMovieLists = [...movieLists];
			newMovieLists[listIndex].movies.push(movie);
			setMovieLists(newMovieLists);
			saveToLocalStorage('react-movie-app-movieLists', newMovieLists);
		} else {
			alert('You are not authorized to add movies to this list.');
		}
	};

	const removeMovieList = (index) => {
		const newMovieLists = movieLists.filter((list, listIndex) => listIndex !== index);
		setMovieLists(newMovieLists);
		saveToLocalStorage('react-movie-app-movieLists', newMovieLists);
	};

	if (!isRegistered) {
		return <Register onRegister={handleRegister} />;
	}

	if (!isLoggedIn) {
		return <Login onLogin={handleLogin} />;
	}

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
			</div>
			<div className='row'>
				<MovieLists movieLists={movieLists} addMovieToList={addMovieToList} movies={movies} />
			</div>
			<div className='row'>
				<CreateList addMovieList={addMovieList} />
			</div>
			<div className='row'>
				<RemoveList movieLists={movieLists} removeList={removeMovieList} />
			</div>
		</div>
	);
};

export default App;
