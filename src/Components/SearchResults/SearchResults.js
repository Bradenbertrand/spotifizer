import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
        console.log(this.props.searchResults)
        return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={this.props.searchResults}></TrackList>
        </div>
        )
    }
}

export default SearchResults;
