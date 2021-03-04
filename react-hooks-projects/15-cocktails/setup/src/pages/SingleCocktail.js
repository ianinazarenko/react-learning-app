import React, { useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
	const [loading, setLoading] = useState(true);
	const [cocktail, setCocktail] = useState(null);

	const { id } = useParams();

	React.useEffect(() => {
		setLoading(true);
		async function fetchCocktail() {
			try {
				const response = await fetch(`${url}${id}`);
				if (response.ok) {
					const data = await response.json();
					if (data.drinks) {
						const {
							strDrink: name,
							strDrinkThumb: img,
							strAlcoholic: info,
							strCategory: category,
							strGlass: glass,
							strInstructions: instructions,
							strIngredient1,
							strIngredient2,
							strIngredient3,
							strIngredient4,
							strIngredient5,
						} = data.drinks[0];

						const ingredients = [
							strIngredient1,
							strIngredient2,
							strIngredient3,
							strIngredient4,
							strIngredient5,
						];

						const newCocktail = {
							name,
							img,
							info,
							category,
							glass,
							instructions,
							ingredients,
						};

						setCocktail(newCocktail);
					} else {
						setCocktail(null);
					}
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchCocktail();
	}, [id]);

	if (loading) {
		return <Loading />;
	}

	if (!cocktail) {
		return <h2 className="section-title">no cocktail to display</h2>;
	}

	const {
		name,
		img,
		info,
		category,
		glass,
		instructions,
		ingredients,
	} = cocktail;

	return (
		<section className="section cocktail-section">
			<Link to="/" className="btn btn-primary">
				back home
			</Link>
			<h2 className="section-title">{name}</h2>
			<div className="drink">
				<img src={img} alt={name} />
				<div className="drink-info">
					<p>
						<span className="drink-data">name :</span>
						{name}
					</p>
					<p>
						<span className="drink-data">category :</span>
						{category}
					</p>
					<p>
						<span className="drink-data">info :</span>
						{info}
					</p>
					<p>
						<span className="drink-data">glass :</span>
						{glass}
					</p>
					<p>
						<span className="drink-data">instructions :</span>
						{instructions}
					</p>
					<p>
						<span className="drink-data">ingredients :</span>
						{ingredients.map((item, index) => {
							return item ? (
								<span key={index}>{item}</span>
							) : null;
						})}
					</p>
				</div>
			</div>
		</section>
	);
};

export default SingleCocktail;
