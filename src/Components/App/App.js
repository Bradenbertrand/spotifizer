import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

let logo = "";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: "red september",
        artist: "juiceWrld",
        album: "kill yourself",
        id: "142",
      }],
      playlistName: "Users Playlist",
      playlistTracks: [{
        name: "Blue Coke",
        artist: "2pac",
        album: "americas most wanted",
        id: "152"
      },
      {
        name: "Blue Coke",
        artist: "2pac",
        album: "americas most wanted",
        id: "152"
      }]
    };
  }

  render() {
    return (
      <div>
        <h1>Spotifi<span className="highlight">zer</span></h1>
        <div className="App">
          <SearchBar></SearchBar>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}></SearchResults>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}></Playlist>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
