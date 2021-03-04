import React from "react";
import { Link } from "react-router-dom";

const Cocktail = (props) => {
	const { image, glass, info, name, id } = props;
	return (
		<article className="cocktail">
			<img src={image} alt={name} className="img-container" />
			<div className="cocktail-footer">
				<h3>{name}</h3>
				<h4>{glass}</h4>
				<p>{info}</p>
				<Link
					to={`/cocktail/${id}`}
					className="btn btn-primary btn-details"
				>
					details
				</Link>
			</div>
		</article>
	);
};

export default Cocktail;
