import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

let logo = "";

// Removes an object from an array via an attribute
var removeByAttr = function(arr, attr, value){
  var i = arr.length;
  while(i--){
     if( arr[i] 
         && arr[i].hasOwnProperty(attr) 
         && (arguments.length > 2 && arr[i][attr] === value ) ){ 

         arr.splice(i,1);

     }
  }
  return arr;
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: "red september",
        artist: "juiceWrld",
        album: "kill yourself",
        id: "142",
      },{
        name: "beetle juice",
        artist: "beetles",
        album: "red room",
        id: "653",
      },{
        name: "Bitch",
        artist: "Sheck Wes",
        album: "All American Reject",
        id: "723",
      },{
        name: "Green Cheese",
        artist: "Drake",
        album: "Blond",
        id: "133"
      },
      {
        name: "Blue Coke",
        artist: "2pac",
        album: "americas most wanted",
        id: "152"
      },{
        name: "Hypnotize",
        artist: "Biggie",
        album: "big life",
        id: "623"
      },{
        name: "Gattling Gun",
        artist: "MGK",
        album: "Suck off",
        id: "153"
      }],
      playlistName: "Users Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }
  
  savePlaylist() {
    var TrackURIs = []
    this.state.playlistTracks.forEach(track => {
        TrackURIs.concat(track);
    })
}

  //Updates the playlists name state
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  //Adds a track to the playlist
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
    this.setState({
      playlistTracks: this.state.playlistTracks.concat(track)
    })
  }

  //Removes a track from the playlist
  removeTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({
      playlistTracks: removeByAttr(this.state.playlistTracks, "id", track.id)
    })
  }

  render() {
    return (
      <div>
        <h1>Spotifi<span className="highlight">zer</span></h1>
        <div className="App">
          <SearchBar></SearchBar>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
            onAdd={this.addTrack} 
            onRemove={this.removeTrack}>
            </SearchResults>
            <Playlist playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} onAdd={this.addTrack} 
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}>
            </Playlist>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
