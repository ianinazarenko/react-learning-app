import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from './context';

const useFetch = (urlParams) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState({ show: false, msg: '' });

	const fetchData = async (url) => {
		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();

				if (data.Response === 'False') {
					setError({ show: true, msg: data.Error });
					setIsLoading(false);
				} else {
					setData(data.Search || data);
					setIsLoading(false);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData(`${API_ENDPOINT}${urlParams}`);
	}, [urlParams]);

	return { isLoading, error, data };
};

export default useFetch;
