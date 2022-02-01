import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Card } from 'antd';

function App() {
	const [countries, setCountries] = useState([]);
	const [countryMatch, setCountryMatch] = useState([]);

	useEffect(() => {
		const loadCountries = async () => {
			const response = await axios.get('https://restcountries.com/v2/all');
			setCountries(response.data);
		};
		loadCountries();
	}, []);

	const searchCountries = (text) => {
		let matches = countries.filter((country) => {
			const regex = new RegExp(`${text}`, 'gi');
			console.log('regex', regex);
			console.log('match', country.name.match(regex));

			return country?.name?.match(regex) || country?.capital?.match(regex);
		});
		console.log('matches', matches);
		setCountryMatch(matches);
	};

	return (
		<div className="App">
			<header className="App-header">
				<h2>I am reacting react app autocomplete from scartch</h2>
				<Input
					style={{ width: '40%', marginTop: '10px', padding: '12px' }}
					onChange={(e) => searchCountries(e.target.value)}
				/>
				{countryMatch &&
					countryMatch.map((item, index) => (
						<div key={index} style={{ mariginLeft: '35%' }}>
							<Card style={{ width: '50%' }} title={`Country: ${item.name}`}>
								Capital: {item.capital}
							</Card>
						</div>
					))}
			</header>
		</div>
	);
}

export default App;
