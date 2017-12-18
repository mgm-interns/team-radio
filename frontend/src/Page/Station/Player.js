import React, { Component } from 'react';

class Player extends Component {
  static getEmbebLink(videoId, startTime) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}`;
  }

  render() {
    return (
      <div>
        <h1>My Station</h1>
        <div>
          <iframe
            width="100%"
            height="480px"
            src={this.getEmbebLink(this.props.videoId, this.props.startTime)}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

export default Player;