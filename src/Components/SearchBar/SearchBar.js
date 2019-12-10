import React from 'react';
import './SearchBar.css';
class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
    }

    handleTermChange(e) {
        this.search(e.target.value)
    }

    search(term) {
        this.props.onSearch(term)
    }

    render() {
        return (
            <div>
                <input placeholder="Enter A song, Album, or Artist" className="SearchInput" onChange={this.handleTermChange}/>
                <button className="SearchButton">Search</button>
            </div>
        );
    };
}

export default SearchBar;