import React from 'react';

const SearchBar = ({ items, setItems, placeholder }) => {

	// Function to check if a string is a link
	function isLink(value) {
		const linkRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
		return linkRegex.test(value);
	}

	const handleSearch = (query) => {
		const filterNestedItems = (item) => {
			return Object.values(item).some((value) => {
				if (typeof value === 'object' && value !== null) {
					return filterNestedItems(value);
				}

				return !isLink(value) && String(value).toLowerCase().includes(query.toLowerCase());
			});
		};
		
		const filteredItems = items.filter((item) => filterNestedItems(item));
		
		if(query) 
			setItems(filteredItems);
		else 
			setItems(items);
	};

	return (
		<div>
			<input type="text" placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)}/>
		</div>
	);
};

export default SearchBar;
