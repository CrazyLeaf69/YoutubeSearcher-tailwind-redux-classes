import React from "react";
import decodeString from "../lib/decodeString";
import { Link } from "react-router-dom";

class VideoCard extends React.Component {
  render() {
    return (
      <Link to={`video/${this.props.video.id.videoId}`}>
        <div className="h-full p-2 border border-black rounded-2xl hover:scale-105 cursor-pointer transition-all dark:bg-transparent dark:text-white dark:border-white">
          <img src={this.props.video.snippet.thumbnails.medium.url} alt="Thumbnail" className="rounded-2xl w-full" />
          <div className="font-bold mt-1">{decodeString(this.props.video.snippet.title)}</div>
          <div>{decodeString(this.props.video.snippet.channelTitle)}</div>
        </div>
      </Link>
    );
  }
}

export default VideoCard;
