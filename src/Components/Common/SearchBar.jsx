import React from 'react';

const SearchBar = ({ items, setItems, placeholder }) => {

    // Function to check if a string is a link
    function isLink(value) {
      const linkRegex = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
      return linkRegex.test(value);
    }

    const handleSearch = (query) => {
      const filteredItems = items.filter((item) =>
          Object.values(item).some((value) => !isLink(value) && String(value).toLowerCase().includes(query.toLowerCase()))
      );
      if(query) setItems(filteredItems);
      else setItems(items);
    };

  return (
    <div>
      <input className="mb-3" type="text" placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)}/>
    </div>
  );
};

export default SearchBar;
