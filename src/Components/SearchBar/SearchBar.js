import React from 'react';
import './SearchBar.css';
class SearchBar extends React.Component {
    render() {
        return (
            <div>
                <input placeholder="Enter A song, Album, or Artist" className="SearchInput"/>
                <button className="SearchButton">Search</button>
            </div>
        );
    };
}

export default SearchBar;