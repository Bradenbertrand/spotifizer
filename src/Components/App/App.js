import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

let logo = "";



function App() {
  return (
    <div>
      <h1>Spotifi<span className="highlight">zer</span></h1>
      <div className="App">
        <SearchBar></SearchBar>
    <div className="App-playlist">
        <SearchResults></SearchResults>
        <Playlist></Playlist>
    </div>
      </div>
    </div>
  );
}

export default App;
