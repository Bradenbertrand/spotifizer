import React from 'react';
import './TrackList.css';
import Track from '../Track/Track'


class TrackList extends React.Component {
    render() {
        console.log("Creating TrackList")
        //Maps tracklist to a div of individual track components
        return (
            <div className="TrackList">
                {
                this.props.tracks.map(track => {
                    return <Track track={track} key={track.id} onAdd={this.props.onAdd} isRemovable={this.props.isRemovable} onRemove={this.props.onRemove} symbol={this.props.symbol}/>
                })
                }
            </div>
        );
    }
}

export default TrackList