import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    handleOnClick() {
        if (this.props.isRemovable) {
            this.removeTrack();
        } else { 
            this.addTrack();
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track)
    }

    removeTrack() {
        this.props.onRemove(this.props.track)
    }

    render() {
        console.log(this.props);
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist + " " + this.props.track.album}</p>
                </div>
                <button className="Track-action" onClick={this.handleOnClick}>+</button>
            </div>
        )
    }
}

export default Track