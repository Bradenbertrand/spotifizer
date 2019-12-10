import React from 'react';
import './Playlist.css'
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this)

    }
    //On name change, update the playlist name state
    handleNameChange(e) {
        this.onNameChange(e.target.value)
    }

    render() {
        return (
            <div className="Playlist">
                <input placeholder="New Playlist" />
                    <TrackList playlistName={this.props.playlistName} 
                    tracks={this.props.playlistTracks} 
                    onRemove={this.props.onRemove} 
                    onAdd={this.props.onAdd} 
                    isRemovable={true} 
                    symbol="-"
                    onChange={this.handleNameChange}>
                    </TrackList>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }

}

export default Playlist