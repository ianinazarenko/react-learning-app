import React from 'react';
import { useGlobalContext } from './context';
import { Link } from 'react-router-dom';
const url =
	'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const Movies = () => {
	const { movies, isLoading } = useGlobalContext();

	if (isLoading) {
		return <div className='loading'></div>;
	}
	return (
		<section className='movies'>
			{movies.map((movie) => {
				console.log(movie);
				const { Poster, Title, Type, Year, imdbID } = movie;
				return (
					<Link key={imdbID} to={`/movie/${imdbID}`}>
						<article>
							<img
								src={Poster === 'N/A' ? url : Poster}
								alt={Title}
							/>
							<div className='movie-info'>
								<h4 className='title'>{Title}</h4>
								<p>{Year}</p>
							</div>
						</article>
					</Link>
				);
			})}
		</section>
	);
};

export default Movies;
