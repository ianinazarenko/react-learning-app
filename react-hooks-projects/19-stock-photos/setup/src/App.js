import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const clientID = '?client_id=' + process.env.REACT_APP_ACCESS_KEY;

function App() {
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState('');

	const fetchPhotos = async () => {
		setLoading(true);
		let url;
		const urlPage = `&page=${page}`;
		const urlQuery = `&query=${query}`;
		if (query) {
			url = searchUrl + clientID + urlPage + urlQuery;
		} else {
			url = mainUrl + clientID + urlPage;
		}

		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				setPhotos((oldPhotos) => {
					if (query && page === 1) {
						return data.results;
					} else if (query) {
						return [...oldPhotos, ...data.results];
					} else {
						return [...oldPhotos, ...data];
					}
				});
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setPage(1);
	};

	useEffect(() => {
		fetchPhotos();
		// eslint-disable-next-line
	}, [page]);

	useEffect(() => {
		const event = window.addEventListener('scroll', () => {
			const fetchHeight =
				window.innerHeight + window.scrollY >=
				document.body.scrollHeight - 4;
			if (!loading && fetchHeight) {
				setPage(page + 1);
			}
		});
		return () => window.removeEventListener('scroll', event);
		// eslint-disable-next-line
	}, []);

	return (
		<main>
			<section className='search'>
				<form className='search-form'>
					<input
						type='text'
						className='form-input'
						placeholder='Search'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button
						className='submit-btn'
						type='submit'
						onClick={handleSubmit}>
						<FaSearch />
					</button>
				</form>
			</section>
			<section className='photos'>
				<div className='photos-center'>
					{photos.map((photo) => {
						return <Photo key={photo.id} {...photo} />;
					})}
				</div>
				{loading && <h2 className='loading'>Loading...</h2>}
			</section>
		</main>
	);
}

export default App;
