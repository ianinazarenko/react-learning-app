import React, { useState, useEffect } from "react";
import {
	FaEnvelopeOpen,
	FaUser,
	FaCalendarTimes,
	FaMap,
	FaPhone,
	FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
	const [loading, setLoading] = useState(false);
	const [person, setPerson] = useState(null);
	const [title, setTitle] = useState("name");
	const [value, setValue] = useState("random person");

	const handleValue = (e) => {
		if (e.target.classList.contains("icon")) {
			const newValue = e.target.dataset.label;
			setTitle(newValue);
			setValue(person[newValue]);
		}
	};

	const getPerson = async () => {
		setLoading(true);
		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				const person = data.results[0];

				const {
					login: { password },
				} = person;
				const age = person.dob.age;
				const image = person.picture.large;
				const { phone, email } = person;
				const { number, name } = person.location.street;
				const { first, last } = person.name;

				const newPerson = {
					phone,
					email,
					password,
					age,
					image,
					name: `${first} ${last}`,
					street: `${number} ${name}`,
				};

				setPerson(newPerson);
				setTitle("name");
				setValue(newPerson.name);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPerson();
	}, []);

	return (
		<main>
			<div className="block bcg-black"></div>
			<div className="block">
				<div className="container">
					<img
						src={(person && person.image) || defaultImage}
						alt="random user"
						className="user-img"
					/>
					<p className="user-title">my {title} is</p>
					<p className="user-value">{value}</p>
					<div className="values-list">
						<button
							data-label="name"
							className="icon"
							onMouseOver={handleValue}
						>
							<FaUser />
						</button>
						<button
							data-label="email"
							className="icon"
							onMouseOver={handleValue}
						>
							<FaEnvelopeOpen />
						</button>
						<button
							data-label="age"
							className="icon"
							onMouseOver={handleValue}
						>
							<FaCalendarTimes />
						</button>
						<button
							data-label="street"
							className="icon"
							onMouseOver={handleValue}
						>
							<FaMap />
						</button>
						<button
							data-label="phone"
							className="icon"
							onMouseOver={handleValue}
						>
							<FaPhone />
						</button>
						<button
							data-label="password"
							className="icon"
							onMouseOver={handleValue}
						>
							<FaLock />
						</button>
					</div>
					<button className="btn" onClick={getPerson}>
						{loading ? "loading..." : "random user"}
					</button>
				</div>
			</div>
		</main>
	);
}

export default App;
