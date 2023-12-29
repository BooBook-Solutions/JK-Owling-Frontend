import React, { useEffect, useState } from 'react';

const SearchBar = ({ items, setItems, placeholder }) => {

    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        if(!searchTerm) {
            setItems(items)
            console.log(items);
        }
    }, [searchTerm])

    const handleSearch = (query) => {
        setSearchTerm(query);
        const filteredItems = items.filter((item) =>
            Object.values(item).some((value) => String(value).toLowerCase().includes(query.toLowerCase()))
        );
        setItems(filteredItems);
    };

  return (
    <div>
      <input className="mb-3" type="text" placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)}/>
    </div>
  );
};

export default SearchBar;
