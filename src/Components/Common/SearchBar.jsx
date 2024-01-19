import React from 'react';

const SearchBar = ({ items, setItems, placeholder }) => {

	const excludedKeys = ['description', 'picture', 'cover']

	const handleSearch = (query) => {
		const filterNestedItems = (item) => {
			return Object.entries(item).some(([key, value]) => {

				if (typeof value === 'object' && value !== null) {
					return filterNestedItems(value);
				}
				
				console.log(key, value);
				return !excludedKeys.includes(key) && String(value).toLowerCase().includes(query.toLowerCase());
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
