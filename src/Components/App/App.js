import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'

const accessToken = Spotify.getAccessToken();

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
      searchResults: [],
      playlistName: "Users Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    if (term === "") {
      return;
    }
    Spotify.search(term, accessToken).then(tracks => {
      this.setState({ searchResults: tracks})
    })
  }

  convertTrackstoTrackURIs(tracks) {
    let trackURIs = tracks.map(track => {
      return  "spotify:track:" + track.id
    })
    return trackURIs
  }

  async savePlaylist() {
    let trackURIs = this.convertTrackstoTrackURIs(this.state.playlistTracks)
    console.log(trackURIs)
    let playlistID = await Spotify.uploadPlaylist(this.state.playlistName, accessToken)
    Spotify.uploadTracks(playlistID, trackURIs, accessToken)

}

  //Updates the playlists name state
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
    console.log(this.state.playlistName)
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
          <SearchBar onSearch={this.search}></SearchBar>
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
