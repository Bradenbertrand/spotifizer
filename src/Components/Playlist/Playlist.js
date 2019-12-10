import React from 'react';
import './Playlist.css'
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
    render() {
        console.log(this.props.playlistTracks + " - Playlist tracks")
        return (
            <div className="Playlist">
                <input placeholder="New Playlist" />
                    <TrackList playlistName={this.props.playlistName} tracks={this.props.playlistTracks} onRemove={this.props.onRemove} onAdd={this.props.onAdd} isRemovable={true}></TrackList>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }

}

export default Playlist