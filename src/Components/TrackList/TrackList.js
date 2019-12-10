import React from 'react';
import './TrackList.css';
import Track from '../Track/Track'


class TrackList extends React.Component {
    render() {
        console.log(this.props.tracks)
        console.log("Creating TrackList")
        return (
            <div className="TrackList">
                {
                this.props.tracks.map(track => {
                    return <Track track={track} key={track.id} onAdd={this.props.onAdd} isRemovable={this.props.isRemovable} onRemove={this.props.onRemove}/>
                })
                }
            </div>
        );
    }
}

export default TrackList